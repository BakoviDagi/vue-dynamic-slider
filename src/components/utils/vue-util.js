/**
 * Deep clone a Vue node
 * @param vnodes
 * @param createElement
 * @param id
 * @returns {*}
 */
export function deepClone(vnodes, createElement, id) {
    function cloneVNode(vnode) {
        const cloned = createElement(vnode.type, vnode.props, vnode.children.default);
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;

        if (vnode.key !== null && vnode.key !== undefined && vnode.key !== '') {
            cloned.key = `${vnode.key}-${id}`;
        }
        return cloned;
    }
    return vnodes.map(vnode => cloneVNode(vnode));
}