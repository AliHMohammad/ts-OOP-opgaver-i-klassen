
//TODO: Ændre list datatype til noget klogere
function construct(list: any[], container: HTMLElement, itemRenderer: ) {
    const listRenderer = {
        render() {
            for (const item of list) {
                const html = itemRenderer.render(item)
                container.insertAdjacentHTML("beforeend", html);
            }
        }
    }

    return listRenderer
}

export {construct}
