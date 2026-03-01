class MoInput extends HTMLElement {
	private container: HTMLDivElement;
	private labelElement: HTMLLabelElement;
	private inputElement: HTMLInputElement;
	private errorElement: HTMLDivElement;
	private prefixSlot: HTMLSlotElement;
	private suffixSlot: HTMLSlotElement;

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
        display: block;
        margin-bottom: 1rem;
      }
      
      .container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      
      .label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #333;
      }
      
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      
      .prefix {
        position: absolute;
        left: 0.75rem;
        z-index: 1;
        color: #666;
      }
      
      .suffix {
        position: absolute;
        right: 0.75rem;
        z-index: 1;
        color: #666;
      }
      
      .input {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 1px solid #E0E0E0;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        transition: all 0.2s ease-in-out;
        box-sizing: border-box;
      }
      
      .input:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
      }
      
      .input.error {
        border-color: #F44336;
      }
      
      .input.error:focus {
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
      }
      
      .input:disabled {
        background-color: #F5F5F5;
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .error-message {
        font-size: 0.75rem;
        color: #F44336;
        margin-top: 0.25rem;
      }
    `;

		// 容器
		this.container = document.createElement("div");
		this.container.className = "container";

		// 标签
		this.labelElement = document.createElement("label");
		this.labelElement.className = "label";

		// 输入框包装器
		const inputWrapper = document.createElement("div");
		inputWrapper.className = "input-wrapper";

		// 前缀插槽
		this.prefixSlot = document.createElement("slot");
		this.prefixSlot.name = "prefix";
		this.prefixSlot.className = "prefix";

		// 输入框
		this.inputElement = document.createElement("input");
		this.inputElement.className = "input";

		// 后缀插槽
		this.suffixSlot = document.createElement("slot");
		this.suffixSlot.name = "suffix";
		this.suffixSlot.className = "suffix";

		// 错误信息
		this.errorElement = document.createElement("div");
		this.errorElement.className = "error-message";
		this.errorElement.style.display = "none";

		inputWrapper.appendChild(this.prefixSlot);
		inputWrapper.appendChild(this.inputElement);
		inputWrapper.appendChild(this.suffixSlot);

		this.container.appendChild(this.labelElement);
		this.container.appendChild(inputWrapper);
		this.container.appendChild(this.errorElement);

		shadow.appendChild(style);
		shadow.appendChild(this.container);

		// 监听输入事件
		this.inputElement.addEventListener("input", () => {
			this.dispatchEvent(new Event("input"));
		});
	}

	static get observedAttributes() {
		return [
			"label",
			"type",
			"value",
			"placeholder",
			"disabled",
			"error",
			"name",
		];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "label") {
			this.labelElement.textContent = newValue;
		} else if (name === "type") {
			this.inputElement.type = newValue;
		} else if (name === "value") {
			this.inputElement.value = newValue || "";
		} else if (name === "placeholder") {
			this.inputElement.placeholder = newValue || "";
		} else if (name === "disabled") {
			this.inputElement.disabled = newValue !== null;
		} else if (name === "error") {
			this.updateError(newValue);
		} else if (name === "name") {
			this.inputElement.name = newValue || "";
		}
	}

	connectedCallback() {
		this.labelElement.textContent = this.getAttribute("label") || "";
		this.inputElement.type = this.getAttribute("type") || "text";
		this.inputElement.value = this.getAttribute("value") || "";
		this.inputElement.placeholder = this.getAttribute("placeholder") || "";
		this.inputElement.disabled = this.hasAttribute("disabled");
		this.inputElement.name = this.getAttribute("name") || "";
		this.updateError(this.getAttribute("error"));
	}

	private updateError(error: string | null) {
		if (error) {
			this.errorElement.textContent = error;
			this.errorElement.style.display = "block";
			this.inputElement.classList.add("error");
		} else {
			this.errorElement.style.display = "none";
			this.inputElement.classList.remove("error");
		}
	}

	// 公开方法
	get value() {
		return this.inputElement.value;
	}

	set value(val: string) {
		this.inputElement.value = val;
	}

	focus() {
		this.inputElement.focus();
	}

	blur() {
		this.inputElement.blur();
	}
}

customElements.define("mo-input", MoInput);

export { MoInput };
