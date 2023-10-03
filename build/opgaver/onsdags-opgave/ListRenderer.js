function construct(list, container, itemRenderer) {
    const ListRenderer = {
        render() {
            container.innerHTML = "";
            for (const item of list) {
                const html = itemRenderer.render(item);
                container.insertAdjacentHTML("beforeend", html);
            }
        },
    };
    return ListRenderer;
}
export { construct };
