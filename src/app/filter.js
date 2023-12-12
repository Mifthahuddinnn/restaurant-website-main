class AlphabeticalFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                select {
                    padding: 5px;
                    font-size: 14px;
                    border-radius: 4px;
                    color: white;
                    background-color: #6c757d;
                    width: 80px; 
                    height: 37px;
                }
                @media (max-width: 767px) {
                    select {
                        width: 100%;
                        margin: 5px 0; 
                        text-align: center;                    
                    }
                }
            </style>
            <select id="filter" name="filter">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        `;
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#filter")
      .addEventListener("change", this.handleFilterChange);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#filter")
      .removeEventListener("change", this.handleFilterChange);
  }

  handleFilterChange() {
    const filterValue = this.shadowRoot.querySelector("#filter").value;
    this.dispatchEvent(
      new CustomEvent("filter-changed", { detail: filterValue })
    );
  }
}

customElements.define("alphabetical-filter", AlphabeticalFilter);
