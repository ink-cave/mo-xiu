import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';

// MenuNode 接口
export interface MenuNode {
  id: string;
  name: string;
  path?: string;
  icon?: string;
  children: MenuNode[];
}

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  // 获取所有权限
  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  // 根据角色获取权限
  async findByRole(role: string): Promise<Permission[]> {
    // 先按角色名查角色 ID
    const roleEntity = await this.roleRepository.findOneBy({ name: role });
    if (!roleEntity) {
      throw new NotFoundException(`Role ${role} not found`);
    }

    // 用 roleId 查关联权限
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { roleId: roleEntity.id },
    });

    const permissionIds = rolePermissions.map((rp) => rp.permissionId);

    if (permissionIds.length === 0) {
      return [];
    }

    // 获取权限详情
    return this.permissionRepository.findByIds(permissionIds);
  }

  // 获取用户的菜单权限和按钮权限
  async getUserPermissions(role: string): Promise<{
    menus: MenuNode[];
    buttons: string[];
  }> {
    let permissions;

    // 如果是超级管理员或管理员角色，直接返回所有权限
    if (role === 'super_admin' || role === 'admin') {
      permissions = await this.findAll();
    } else {
      permissions = await this.findByRole(role);
    }

    // 分离菜单权限和按钮权限
    const menuPermissions = permissions.filter((p) => p.type === 'menu');
    const buttonPermissions = permissions.filter((p) => p.type === 'button');

    // 构建菜单树
    const menus = this.buildMenuTree(menuPermissions);

    // 提取按钮权限代码
    const buttons = buttonPermissions.map((p) => p.code);

    return {
      menus,
      buttons,
    };
  }

  // 构建菜单树
  private buildMenuTree(permissions: Permission[]): MenuNode[] {
    const menuMap: Record<number, MenuNode> = {};
    const rootMenus: MenuNode[] = [];

    // 构建权限 ID 到权限对象的映射，用于快速查找
    const permissionMap = new Map<number, Permission>();
    permissions.forEach((perm) => {
      permissionMap.set(perm.id, perm);
    });

    // 首先创建所有菜单节点
    for (const permission of permissions) {
      menuMap[permission.id] = {
        id: permission.id.toString(),
        name: permission.name,
        path: permission.path,
        icon: permission.icon,
        children: [],
      };
    }

    // 构建菜单树结构
    for (const permission of permissions) {
      if (permission.parentId === null || permission.parentId === undefined) {
        // 根菜单
        rootMenus.push(menuMap[permission.id]);
      } else {
        // 子菜单
        if (menuMap[permission.parentId]) {
          menuMap[permission.parentId].children.push(menuMap[permission.id]);
        }
      }
    }

    // 排序函数
    const sortMenus = (menus: MenuNode[]) => {
      menus.sort((a, b) => {
        const aPerm = permissionMap.get(parseInt(a.id));
        const bPerm = permissionMap.get(parseInt(b.id));
        return (aPerm?.sort || 0) - (bPerm?.sort || 0);
      });
      // 递归排序子菜单
      menus.forEach((menu) => {
        if (menu.children.length > 0) {
          sortMenus(menu.children);
        }
      });
    };

    // 排序所有菜单（包括子菜单）
    sortMenus(rootMenus);

    return rootMenus;
  }

  // 创建权限
  async create(permission: Partial<Permission>): Promise<Permission> {
    // 校验 code 唯一性
    if (permission.code) {
      const existing = await this.permissionRepository.findOneBy({
        code: permission.code,
      });
      if (existing) {
        throw new NotFoundException(
          `Permission with code ${permission.code} already exists`,
        );
      }
    }
    const newPermission = this.permissionRepository.create(permission);
    return this.permissionRepository.save(newPermission);
  }

  // 更新权限
  async update(
    id: number,
    permission: Partial<Permission>,
  ): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findOneBy({
      id,
    });
    if (!existingPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    Object.assign(existingPermission, permission);
    return this.permissionRepository.save(existingPermission);
  }

  // 删除权限
  async remove(id: number): Promise<void> {
    // 先级联删除关联的 role_permissions 数据
    await this.rolePermissionRepository.delete({ permissionId: id });
    // 再删除权限
    await this.permissionRepository.delete(id);
  }

  // 为角色分配权限
  async assignPermissionToRole(
    role: string,
    permissionId: number,
  ): Promise<RolePermission> {
    // 校验角色是否存在
    const roleEntity = await this.roleRepository.findOneBy({ name: role });
    if (!roleEntity) {
      throw new NotFoundException(`Role ${role} not found`);
    }

    // 校验权限是否存在
    const permission = await this.permissionRepository.findOneBy({
      id: permissionId,
    });
    if (!permission) {
      throw new NotFoundException(
        `Permission with ID ${permissionId} not found`,
      );
    }

    const existing = await this.rolePermissionRepository.findOneBy({
      roleId: roleEntity.id,
      permissionId,
    });

    if (existing) {
      return existing;
    }

    const rolePermission = this.rolePermissionRepository.create({
      roleId: roleEntity.id,
      permissionId,
    });

    return this.rolePermissionRepository.save(rolePermission);
  }

  // 从角色中移除权限
  async removePermissionFromRole(
    role: string,
    permissionId: number,
  ): Promise<void> {
    // 校验角色是否存在
    const roleEntity = await this.roleRepository.findOneBy({ name: role });
    if (!roleEntity) {
      throw new NotFoundException(`Role ${role} not found`);
    }

    // 校验权限是否存在
    const permission = await this.permissionRepository.findOneBy({
      id: permissionId,
    });
    if (!permission) {
      throw new NotFoundException(
        `Permission with ID ${permissionId} not found`,
      );
    }

    await this.rolePermissionRepository.delete({
      roleId: roleEntity.id,
      permissionId,
    });
  }

  // 初始化默认权限
  async initializeDefaultPermissions(): Promise<void> {
    // 初始化默认角色
    const defaultRoles: Partial<Role>[] = [
      { name: 'super_admin', description: '超级管理员', isActive: true },
      { name: 'admin', description: '管理员', isActive: true },
      { name: 'test', description: '测试角色', isActive: true },
      { name: 'developer', description: '开发角色', isActive: true },
      { name: 'other', description: '其他角色', isActive: true },
    ];

    // 确保每个角色都存在
    for (const roleData of defaultRoles) {
      const existingRole = await this.roleRepository.findOneBy({
        name: roleData.name,
      });
      if (!existingRole) {
        await this.roleRepository.save(roleData);
      }
    }

    // 检查是否已有权限数据
    const count = await this.permissionRepository.count();
    if (count === 0) {
      // 默认菜单权限 - 先不设置 parentId
      const defaultPermissions: Partial<Permission>[] = [
        {
          code: 'menu:home',
          name: '首页',
          type: 'menu',
          path: '/home',
          icon: 'House',
          sort: 1,
        },
        {
          code: 'menu:user',
          name: '用户管理',
          type: 'menu',
          path: 'user',
          icon: 'User',
          sort: 2,
        },
        {
          code: 'menu:user_list',
          name: '用户列表',
          type: 'menu',
          path: '/home/user',
          sort: 1,
        },
        {
          code: 'menu:project',
          name: '项目管理',
          type: 'menu',
          path: 'project',
          icon: 'Document',
          sort: 3,
        },
        {
          code: 'menu:project_list',
          name: '项目列表',
          type: 'menu',
          path: '/home/project',
          sort: 1,
        },
        {
          code: 'menu:system',
          name: '系统管理',
          type: 'menu',
          path: 'system',
          icon: 'Setting',
          sort: 4,
        },
        {
          code: 'menu:system_config',
          name: '系统配置',
          type: 'menu',
          path: '/home/system',
          sort: 1,
        },
        {
          code: 'menu:permission',
          name: '权限管理',
          type: 'menu',
          path: 'permission',
          icon: 'Lock',
          sort: 5,
        },
        {
          code: 'menu:permission_list',
          name: '权限列表',
          type: 'menu',
          path: '/home/permission',
          sort: 1,
        },
        {
          code: 'menu:role_permission',
          name: '角色权限',
          type: 'menu',
          path: '/home/role-permission',
          sort: 2,
        },
        {
          code: 'menu:profile',
          name: '个人信息',
          type: 'menu',
          path: '/home/profile',
          icon: 'User',
          sort: 6,
        },
        // 按钮权限
        { code: 'btn:add', name: '添加', type: 'button' },
        { code: 'btn:edit', name: '编辑', type: 'button' },
        { code: 'btn:delete', name: '删除', type: 'button' },
        { code: 'btn:view', name: '查看', type: 'button' },
        { code: 'btn:assign', name: '分配权限', type: 'button' },
      ];

      // 创建默认权限
      const createdPermissions =
        await this.permissionRepository.save(defaultPermissions);

      // 构建权限 code 到 id 的映射
      const permissionMap = new Map<string, number>();
      createdPermissions.forEach((perm) => {
        permissionMap.set(perm.code, perm.id);
      });

      // 更新子菜单的 parentId
      const updatePromises = createdPermissions.map(async (perm) => {
        if (perm.code === 'menu:user_list') {
          perm.parentId = permissionMap.get('menu:user');
        } else if (perm.code === 'menu:project_list') {
          perm.parentId = permissionMap.get('menu:project');
        } else if (perm.code === 'menu:system_config') {
          perm.parentId = permissionMap.get('menu:system');
        } else if (
          perm.code === 'menu:permission_list' ||
          perm.code === 'menu:role_permission'
        ) {
          perm.parentId = permissionMap.get('menu:permission');
        }
        if (perm.parentId) {
          await this.permissionRepository.save(perm);
        }
      });

      await Promise.all(updatePromises);

      // 为不同角色分配权限
      const rolePermissions = [
        // 超级管理员角色权限
        {
          role: 'super_admin',
          permissionCodes: [
            'menu:home',
            'menu:user',
            'menu:user_list',
            'menu:project',
            'menu:project_list',
            'menu:system',
            'menu:system_config',
            'menu:permission',
            'menu:permission_list',
            'menu:role_permission',
            'menu:profile',
            'btn:add',
            'btn:edit',
            'btn:delete',
            'btn:view',
            'btn:assign',
          ],
        },
        // 管理员角色权限
        {
          role: 'admin',
          permissionCodes: [
            'menu:home',
            'menu:user',
            'menu:user_list',
            'menu:project',
            'menu:project_list',
            'menu:system',
            'menu:system_config',
            'menu:permission',
            'menu:permission_list',
            'menu:role_permission',
            'menu:profile',
            'btn:add',
            'btn:edit',
            'btn:delete',
            'btn:view',
            'btn:assign',
          ],
        },
        // 测试角色权限
        {
          role: 'test',
          permissionCodes: [
            'menu:home',
            'menu:project',
            'menu:project_list',
            'menu:profile',
            'btn:add',
            'btn:view',
            'btn:assign',
          ],
        },
        // 开发角色权限
        {
          role: 'developer',
          permissionCodes: [
            'menu:home',
            'menu:project',
            'menu:project_list',
            'menu:profile',
            'btn:add',
            'btn:edit',
            'btn:view',
            'btn:assign',
          ],
        },
        // 其他角色权限
        {
          role: 'other',
          permissionCodes: [
            'menu:home',
            'menu:project',
            'menu:project_list',
            'btn:view',
            'btn:assign',
          ],
        },
      ];

      // 分配权限
      for (const rp of rolePermissions) {
        const roleEntity = await this.roleRepository.findOneBy({
          name: rp.role,
        });
        if (roleEntity) {
          for (const code of rp.permissionCodes) {
            const permissionId = permissionMap.get(code);
            if (permissionId) {
              await this.rolePermissionRepository.save({
                roleId: roleEntity.id,
                permissionId,
              });
            }
          }
        }
      }
    }

    // 初始化默认菜单数据（无论是否已有权限数据，都执行）
    await this.initializeDefaultMenus();
  }

  // 初始化默认菜单数据
  private async initializeDefaultMenus(): Promise<void> {
    // 清空现有菜单数据
    await this.menuRepository.clear();
    console.log('清空现有菜单数据');

    // 默认菜单数据 - 分为顶级菜单和子菜单
    const topLevelMenus: Partial<Menu>[] = [
      {
        name: '系统管理',
        type: 'dir',
        parentId: null,
        path: '/home/system',
        icon: 'Setting',
        sort: 1,
        status: 1,
      },
      {
        name: '用户管理',
        type: 'dir',
        parentId: null,
        path: '/home/user',
        icon: 'User',
        sort: 2,
        status: 1,
      },
      {
        name: '项目管理',
        type: 'dir',
        parentId: null,
        path: '/home/project',
        icon: 'Document',
        sort: 3,
        status: 1,
      },
      {
        name: '权限管理',
        type: 'dir',
        parentId: null,
        path: '/home/permission',
        icon: 'Lock',
        sort: 4,
        status: 1,
      },
      {
        name: '个人信息',
        type: 'menu',
        parentId: null,
        path: '/home/profile',
        component: 'profile/Profile',
        permission: 'menu:profile',
        icon: 'User',
        sort: 5,
        status: 1,
      },
    ];

    // 首先插入顶级菜单
    const createdTopLevelMenus = await this.menuRepository.save(topLevelMenus);
    console.log('创建顶级菜单成功，数量:', createdTopLevelMenus.length);

    // 构建顶级菜单名称到 id 的映射
    const menuNameToIdMap = new Map<string, number>();
    createdTopLevelMenus.forEach((menu) => {
      if (menu.name) {
        menuNameToIdMap.set(menu.name, menu.id);
      }
    });

    // 子菜单数据
    const subMenus: Partial<Menu>[] = [
      {
        name: '菜单管理',
        type: 'menu',
        parentId: menuNameToIdMap.get('系统管理'),
        path: '/home/system/menu',
        component: 'system/MenuManagement',
        permission: 'menu:menu_management',
        icon: 'Menu',
        sort: 1,
        status: 1,
      },
      {
        name: '用户列表',
        type: 'menu',
        parentId: menuNameToIdMap.get('用户管理'),
        path: '/home/user',
        component: 'user/UserList',
        permission: 'menu:user_list',
        icon: 'List',
        sort: 1,
        status: 1,
      },
      {
        name: '项目列表',
        type: 'menu',
        parentId: menuNameToIdMap.get('项目管理'),
        path: '/home/project',
        component: 'project/ProjectList',
        permission: 'menu:project_list',
        icon: 'List',
        sort: 1,
        status: 1,
      },
      {
        name: '权限列表',
        type: 'menu',
        parentId: menuNameToIdMap.get('权限管理'),
        path: '/home/permission',
        component: 'permission/PermissionList',
        permission: 'menu:permission_list',
        icon: 'List',
        sort: 1,
        status: 1,
      },
      {
        name: '角色权限',
        type: 'menu',
        parentId: menuNameToIdMap.get('权限管理'),
        path: '/home/role-permission',
        component: 'permission/RolePermission',
        permission: 'menu:role_permission',
        icon: 'User',
        sort: 2,
        status: 1,
      },
    ];

    // 然后插入子菜单
    const createdSubMenus = await this.menuRepository.save(subMenus);
    console.log('创建子菜单成功，数量:', createdSubMenus.length);

    // 检查创建的菜单
    const menuCount = await this.menuRepository.count();
    console.log('当前菜单数量:', menuCount);
  }
}
