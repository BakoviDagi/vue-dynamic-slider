import { h } from 'vue';

/**
 * Deep clone a Vue node
 * @param vnodes
 * @param id
 * @returns {*}
 */
export function deepCloneComponent(vnodes, id) {
    function cloneVNode(vnode) {
        let key = undefined;
        if (vnode.key !== null && vnode.key !== undefined && vnode.key !== '') {
            key = `${vnode.key}-${id}`;
        }

        const cloned = h(vnode.type, {
            ...vnode.props,
            key
        }, vnode.children.default);
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        return cloned;
    }
    return vnodes.map(vnode => cloneVNode(vnode));
}