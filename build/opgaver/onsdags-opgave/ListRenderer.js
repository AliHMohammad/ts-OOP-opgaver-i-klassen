function construct(list, container, itemRenderer) {
    const ListRenderer = {
        sortBy: "",
        sortDir: "",
        filterProperty: "",
        filterValue: "",
        items: list,
        render() {
            container.innerHTML = "";
            for (const item of this.items) {
                const html = itemRenderer.render(item);
                container.insertAdjacentHTML("beforeend", html);
            }
        },
        sort(sortBy, sortDirection) {
            console.log(sortDirection);
            this.sortDir = sortDirection;
            this.sortBy = sortBy;
            list.sort((a, b) => {
                if (a[this.sortBy] > b[this.sortBy]) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            if (this.sortDir === "DESC") {
                list.reverse();
            }
            this.render();
        },
        filter(filterProperty, filterValue) {
            console.log(filterProperty);
            console.log(filterValue);
            this.filterProperty = filterProperty;
            let filteredList = [];
            if (filterValue) {
                this.filterValue = filterValue;
                filteredList = this.items.filter(item => item[this.filterProperty] == this.filterValue);
            }
            else {
                filteredList = this.items.filter(item => item[this.filterProperty]);
            }
            this.items = filteredList;
            this.render();
        }
    };
    return ListRenderer;
}
export { construct };
