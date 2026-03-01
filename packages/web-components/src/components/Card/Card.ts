class MoCard extends HTMLElement {
	private cardElement: HTMLDivElement;

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
      }
      
      .card {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        transition: all 0.2s ease-in-out;
      }
      
      .card:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      
      .card.clickable {
        cursor: pointer;
      }
      
      .card.clickable:hover {
        transform: translateY(-2px);
      }
      
      .card.padding-sm {
        padding: 0.5rem;
      }
      
      .card.padding-md {
        padding: 1rem;
      }
      
      .card.padding-lg {
        padding: 1.5rem;
      }
      
      .card.rounded-sm {
        border-radius: 0.25rem;
      }
      
      .card.rounded-md {
        border-radius: 0.5rem;
      }
      
      .card.rounded-lg {
        border-radius: 0.75rem;
      }
      
      .card.shadow-sm {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      
      .card.shadow-md {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .card.shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
    `;

		// 卡片元素
		this.cardElement = document.createElement("div");
		this.cardElement.className = "card";

		// 插槽
		const slot = document.createElement("slot");

		this.cardElement.appendChild(slot);
		shadow.appendChild(style);
		shadow.appendChild(this.cardElement);

		// 监听点击事件
		this.cardElement.addEventListener("click", () => {
			if (this.hasAttribute("clickable")) {
				this.dispatchEvent(new Event("click"));
			}
		});
	}

	static get observedAttributes() {
		return ["clickable", "padding", "rounded", "shadow"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "clickable") {
			if (newValue !== null) {
				this.cardElement.classList.add("clickable");
			} else {
				this.cardElement.classList.remove("clickable");
			}
		} else if (name === "padding") {
			this.cardElement.classList.remove(
				"padding-sm",
				"padding-md",
				"padding-lg"
			);
			if (newValue) {
				this.cardElement.classList.add(`padding-${newValue}`);
			}
		} else if (name === "rounded") {
			this.cardElement.classList.remove(
				"rounded-sm",
				"rounded-md",
				"rounded-lg"
			);
			if (newValue) {
				this.cardElement.classList.add(`rounded-${newValue}`);
			}
		} else if (name === "shadow") {
			this.cardElement.classList.remove("shadow-sm", "shadow-md", "shadow-lg");
			if (newValue) {
				this.cardElement.classList.add(`shadow-${newValue}`);
			}
		}
	}

	connectedCallback() {
		if (this.hasAttribute("clickable")) {
			this.cardElement.classList.add("clickable");
		}

		const padding = this.getAttribute("padding");
		if (padding) {
			this.cardElement.classList.add(`padding-${padding}`);
		}

		const rounded = this.getAttribute("rounded");
		if (rounded) {
			this.cardElement.classList.add(`rounded-${rounded}`);
		}

		const shadow = this.getAttribute("shadow");
		if (shadow) {
			this.cardElement.classList.add(`shadow-${shadow}`);
		}
	}
}

customElements.define("mo-card", MoCard);

export { MoCard };
