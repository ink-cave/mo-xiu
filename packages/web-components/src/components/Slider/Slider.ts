class MoSlider extends HTMLElement {
	private container: HTMLDivElement;
	private sliderElement: HTMLInputElement | null = null;
	private tooltipElement: HTMLDivElement;
	private min: number = 0;
	private max: number = 100;
	private step: number = 1;
	private value: number = 0;

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
        margin: 1rem 0;
      }
      
      .container {
        position: relative;
        padding: 2rem 0;
      }
      
      .slider {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: #E0E0E0;
        outline: none;
        -webkit-appearance: none;
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
      
      .slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 0 0 8px rgba(76, 175, 80, 0.1);
      }
      
      .slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease-in-out;
      }
      
      .slider::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 0 0 8px rgba(76, 175, 80, 0.1);
      }
      
      .tooltip {
        position: absolute;
        top: 0;
        background: #333;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        white-space: nowrap;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        pointer-events: none;
      }
      
      .tooltip.visible {
        opacity: 1;
      }
      
      .slider:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .slider:disabled::-webkit-slider-thumb {
        cursor: not-allowed;
      }
      
      .slider:disabled::-moz-range-thumb {
        cursor: not-allowed;
      }
    `;

		// 容器
		this.container = document.createElement("div");
		this.container.className = "container";

		// 滑块元素
		this.sliderElement = document.createElement("input");
		this.sliderElement.type = "range";
		this.sliderElement.className = "slider";

		//  tooltip
		this.tooltipElement = document.createElement("div");
		this.tooltipElement.className = "tooltip";

		this.container.appendChild(this.sliderElement);
		this.container.appendChild(this.tooltipElement);

		shadow.appendChild(style);
		shadow.appendChild(this.container);

		// 监听事件
		if (this.sliderElement) {
			this.sliderElement.addEventListener("input", this.handleInput.bind(this));
			this.sliderElement.addEventListener(
				"pointerdown",
				this.handlePointerDown.bind(this)
			);
			this.sliderElement.addEventListener(
				"pointerup",
				this.handlePointerUp.bind(this)
			);
			this.sliderElement.addEventListener(
				"pointermove",
				this.handlePointerMove.bind(this)
			);
		}
	}

	static get observedAttributes() {
		return ["min", "max", "step", "value", "disabled"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (!this.sliderElement) return;

		if (name === "min") {
			this.min = parseFloat(newValue) || 0;
			this.sliderElement.min = this.min.toString();
		} else if (name === "max") {
			this.max = parseFloat(newValue) || 100;
			this.sliderElement.max = this.max.toString();
		} else if (name === "step") {
			this.step = parseFloat(newValue) || 1;
			this.sliderElement.step = this.step.toString();
		} else if (name === "value") {
			this.value = parseFloat(newValue) || 0;
			this.sliderElement.value = this.value.toString();
		} else if (name === "disabled") {
			this.sliderElement.disabled = newValue !== null;
		}
	}

	connectedCallback() {
		if (!this.sliderElement) return;

		this.min = parseFloat(this.getAttribute("min") || "0") || 0;
		this.max = parseFloat(this.getAttribute("max") || "100") || 100;
		this.step = parseFloat(this.getAttribute("step") || "1") || 1;
		this.value = parseFloat(this.getAttribute("value") || "0") || 0;

		this.sliderElement.min = this.min.toString();
		this.sliderElement.max = this.max.toString();
		this.sliderElement.step = this.step.toString();
		this.sliderElement.value = this.value.toString();
		this.sliderElement.disabled = this.hasAttribute("disabled");
	}

	private handleInput() {
		if (!this.sliderElement) return;

		this.value = parseFloat(this.sliderElement.value);
		this.updateTooltip();
		this.dispatchEvent(new Event("input"));
	}

	private handlePointerDown() {
		this.tooltipElement.classList.add("visible");
		this.updateTooltip();
	}

	private handlePointerUp() {
		this.tooltipElement.classList.remove("visible");
	}

	private handlePointerMove() {
		if (this.tooltipElement.classList.contains("visible")) {
			this.updateTooltip();
		}
	}

	private updateTooltip() {
		if (!this.sliderElement) return;

		const value = this.sliderElement.value;
		this.tooltipElement.textContent = value;

		const percentage =
			((parseFloat(value) - this.min) / (this.max - this.min)) * 100;
		const left = percentage + "%";

		this.tooltipElement.style.left = left;
	}

	// 公开方法
	get value() {
		return this.value;
	}

	set value(val: number) {
		this.value = val;
		if (this.sliderElement) {
			this.sliderElement.value = val.toString();
		}
	}
}

customElements.define("mo-slider", MoSlider);

export { MoSlider };
