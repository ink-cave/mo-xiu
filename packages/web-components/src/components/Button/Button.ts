class MoButton extends HTMLElement {
	private buttonElement: HTMLButtonElement;
	private loadingElement: HTMLSpanElement;

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
      
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        border: none;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      
      .button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .button-primary {
        background-color: #4CAF50;
        color: white;
      }
      
      .button-primary:hover:not(:disabled) {
        background-color: #45a049;
      }
      
      .button-primary:active:not(:disabled) {
        background-color: #3d8b40;
      }
      
      .button-secondary {
        background-color: #666666;
        color: white;
      }
      
      .button-secondary:hover:not(:disabled) {
        background-color: #555555;
      }
      
      .button-secondary:active:not(:disabled) {
        background-color: #444444;
      }
      
      .button-danger {
        background-color: #F44336;
        color: white;
      }
      
      .button-danger:hover:not(:disabled) {
        background-color: #e53935;
      }
      
      .button-danger:active:not(:disabled) {
        background-color: #d32f2f;
      }
      
      .loading {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 0.5rem;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;

		// 按钮元素
		this.buttonElement = document.createElement("button");
		this.buttonElement.className = "button button-primary";

		// 加载图标
		this.loadingElement = document.createElement("span");
		this.loadingElement.className = "loading";
		this.loadingElement.style.display = "none";

		// 插槽
		const slot = document.createElement("slot");

		this.buttonElement.appendChild(this.loadingElement);
		this.buttonElement.appendChild(slot);
		shadow.appendChild(style);
		shadow.appendChild(this.buttonElement);

		// 监听属性变化
		this.observedAttributes = ["variant", "disabled", "loading"];
	}

	static get observedAttributes() {
		return ["variant", "disabled", "loading"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "variant") {
			this.updateVariant(newValue);
		} else if (name === "disabled") {
			this.updateDisabled(newValue !== null);
		} else if (name === "loading") {
			this.updateLoading(newValue !== null);
		}
	}

	connectedCallback() {
		this.updateVariant(this.getAttribute("variant") || "primary");
		this.updateDisabled(this.hasAttribute("disabled"));
		this.updateLoading(this.hasAttribute("loading"));
	}

	private updateVariant(variant: string) {
		this.buttonElement.className = "button";
		this.buttonElement.classList.add(`button-${variant}`);
	}

	private updateDisabled(disabled: boolean) {
		this.buttonElement.disabled = disabled;
	}

	private updateLoading(loading: boolean) {
		this.loadingElement.style.display = loading ? "inline-block" : "none";
		this.buttonElement.disabled = loading || this.hasAttribute("disabled");
	}
}

customElements.define("mo-button", MoButton);

export { MoButton };
