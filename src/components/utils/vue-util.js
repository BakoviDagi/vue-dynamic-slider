// https://stackoverflow.com/a/51066092
export function deepClone(vnodes, createElement, id) {
    function cloneVNode(vnode) {
        const clonedChildren = vnode.children && vnode
            .children
            .map(vnode => cloneVNode(vnode));
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;

        //TODO this kinda works but is horrible broken...
        // if (!descendant) {
        //     cloned.data.staticClass = vnode.data.staticClass || '';
        //     cloned.data.staticClass = cloned.data.staticClass.toString();
        //     cloned.data.staticClass+= ' clone'
        // }

        // cloned.data = vnode.data;
        // cloned.child = vnode.child;
        //eslint-disable-next-line
        // console.log(vnode.$child._uid);
        //eslint-disable-next-line
        // console.log('cloning', vnode, cloned);
        if (vnode.key !== null && vnode.key !== undefined && vnode.key !== '') {
            cloned.key = `${vnode.key}-${id}`;
        }
        return cloned;
    }
    return vnodes.map(vnode => cloneVNode(vnode));
}