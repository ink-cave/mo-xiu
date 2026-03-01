class MoSwitch extends HTMLElement {
	private switchElement: HTMLButtonElement;
	private thumbElement: HTMLDivElement;
	private checked: boolean = false;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		// 样式
		const style = document.createElement("style");
		style.textContent = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      
      :host {
        display: inline-block;
      }
      
      .switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
        background-color: #E0E0E0;
        border-radius: 12px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        border: none;
        outline: none;
      }
      
      .switch.checked {
        background-color: #4CAF50;
      }
      
      .switch:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .switch.checked .thumb {
        transform: translateX(24px);
      }
    `;

		// 开关元素
		this.switchElement = document.createElement("button");
		this.switchElement.className = "switch";

		// 滑块元素
		this.thumbElement = document.createElement("div");
		this.thumbElement.className = "thumb";

		this.switchElement.appendChild(this.thumbElement);
		shadow.appendChild(style);
		shadow.appendChild(this.switchElement);

		// 监听点击事件
		this.switchElement.addEventListener("click", this.handleClick.bind(this));
	}

	static get observedAttributes() {
		return ["checked", "disabled"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "checked") {
			this.checked = newValue !== null;
			this.updateState();
		} else if (name === "disabled") {
			this.switchElement.disabled = newValue !== null;
		}
	}

	connectedCallback() {
		this.checked = this.hasAttribute("checked");
		this.switchElement.disabled = this.hasAttribute("disabled");
		this.updateState();
	}

	private handleClick() {
		if (this.switchElement.disabled) return;

		this.checked = !this.checked;
		this.updateState();
		this.dispatchEvent(new Event("change"));
	}

	private updateState() {
		if (this.checked) {
			this.switchElement.classList.add("checked");
			this.setAttribute("checked", "");
		} else {
			this.switchElement.classList.remove("checked");
			this.removeAttribute("checked");
		}
	}

	// 公开方法
	get checked() {
		return this.checked;
	}

	set checked(val: boolean) {
		this.checked = val;
		this.updateState();
	}
}

customElements.define("mo-switch", MoSwitch);

export { MoSwitch };
