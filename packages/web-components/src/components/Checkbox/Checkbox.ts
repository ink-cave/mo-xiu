class MoCheckbox extends HTMLElement {
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
      
      .checkmark {
        height: 18px;
        width: 18px;
        background-color: #f5f5f5;
        border: 1px solid #E0E0E0;
        border-radius: 0.25rem;
        transition: all 0.2s ease-in-out;
        position: relative;
      }
      
      .container:hover .checkmark {
        background-color: #e8f5e8;
      }
      
      .container .input:checked ~ .checkmark {
        background-color: #4CAF50;
        border-color: #4CAF50;
      }
      
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 3px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      
      .container .input:checked ~ .checkmark:after {
        display: block;
      }
      
      .container .input:disabled ~ .checkmark {
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
		this.inputElement.type = "checkbox";
		this.inputElement.className = "input";

		// 复选框
		const checkmark = document.createElement("div");
		checkmark.className = "checkmark";

		// 标签
		this.labelElement = document.createElement("label");
		this.labelElement.className = "label";

		// 插槽
		const slot = document.createElement("slot");
		this.labelElement.appendChild(slot);

		this.container.appendChild(this.inputElement);
		this.container.appendChild(checkmark);
		this.container.appendChild(this.labelElement);

		shadow.appendChild(style);
		shadow.appendChild(this.container);

		// 监听事件
		this.inputElement.addEventListener("change", this.handleChange.bind(this));
	}

	static get observedAttributes() {
		return ["checked", "disabled", "name"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "checked") {
			this.checked = newValue !== null;
			this.inputElement.checked = this.checked;
		} else if (name === "disabled") {
			this.inputElement.disabled = newValue !== null;
		} else if (name === "name") {
			this.inputElement.name = newValue || "";
		}
	}

	connectedCallback() {
		this.checked = this.hasAttribute("checked");
		this.inputElement.checked = this.checked;
		this.inputElement.disabled = this.hasAttribute("disabled");
		this.inputElement.name = this.getAttribute("name") || "";
	}

	private handleChange() {
		this.checked = this.inputElement.checked;
		if (this.checked) {
			this.setAttribute("checked", "");
		} else {
			this.removeAttribute("checked");
		}
		this.dispatchEvent(new Event("change"));
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
}

customElements.define("mo-checkbox", MoCheckbox);

export { MoCheckbox };
