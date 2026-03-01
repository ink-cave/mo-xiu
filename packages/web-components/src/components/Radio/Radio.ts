class MoRadio extends HTMLElement {
	private container: HTMLDivElement;
	private inputElement: HTMLInputElement;
	private labelElement: HTMLLabelElement;
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
      
      .container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      
      .input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      
      .radio {
        height: 18px;
        width: 18px;
        background-color: #f5f5f5;
        border: 1px solid #E0E0E0;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        position: relative;
      }
      
      .container:hover .radio {
        background-color: #e8f5e8;
      }
      
      .container .input:checked ~ .radio {
        background-color: #4CAF50;
        border-color: #4CAF50;
      }
      
      .radio:after {
        content: "";
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
      
      .container .input:checked ~ .radio:after {
        display: block;
      }
      
      .container .input:disabled ~ .radio {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: #f5f5f5;
        border-color: #E0E0E0;
      }
      
      .label {
        font-size: 0.875rem;
        color: #333;
        cursor: pointer;
      }
      
      .container .input:disabled ~ .label {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;

		// 容器
		this.container = document.createElement("div");
		this.container.className = "container";

		// 输入框
		this.inputElement = document.createElement("input");
		this.inputElement.type = "radio";
		this.inputElement.className = "input";

		// 单选框
		const radio = document.createElement("div");
		radio.className = "radio";

		// 标签
		this.labelElement = document.createElement("label");
		this.labelElement.className = "label";

		// 插槽
		const slot = document.createElement("slot");
		this.labelElement.appendChild(slot);

		this.container.appendChild(this.inputElement);
		this.container.appendChild(radio);
		this.container.appendChild(this.labelElement);

		shadow.appendChild(style);
		shadow.appendChild(this.container);

		// 监听事件
		this.inputElement.addEventListener("change", this.handleChange.bind(this));
	}

	static get observedAttributes() {
		return ["checked", "disabled", "name", "value"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "checked") {
			this.checked = newValue !== null;
			this.inputElement.checked = this.checked;
		} else if (name === "disabled") {
			this.inputElement.disabled = newValue !== null;
		} else if (name === "name") {
			this.inputElement.name = newValue || "";
		} else if (name === "value") {
			this.inputElement.value = newValue || "";
		}
	}

	connectedCallback() {
		this.checked = this.hasAttribute("checked");
		this.inputElement.checked = this.checked;
		this.inputElement.disabled = this.hasAttribute("disabled");
		this.inputElement.name = this.getAttribute("name") || "";
		this.inputElement.value = this.getAttribute("value") || "";
	}

	private handleChange() {
		// 当当前 radio 被选中时，更新状态
		if (this.inputElement.checked) {
			this.checked = true;
			this.setAttribute("checked", "");
			this.dispatchEvent(new Event("change"));
		}
	}

	// 公开方法
	get checked() {
		return this.checked;
	}

	set checked(val: boolean) {
		this.checked = val;
		this.inputElement.checked = val;
		if (val) {
			this.setAttribute("checked", "");
		} else {
			this.removeAttribute("checked");
		}
	}

	get value() {
		return this.inputElement.value;
	}

	set value(val: string) {
		this.inputElement.value = val;
	}
}

customElements.define("mo-radio", MoRadio);

export { MoRadio };
