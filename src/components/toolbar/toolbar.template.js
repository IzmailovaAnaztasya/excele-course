function toButton(button) {
    const json = JSON.stringify(button.value);
    //console.log(json);
    const meta = `data-type="typebutton"
        data-value='${json}'
    `;
    return `
        <div class="button ${button.active ? 'active' : ''} " ${meta}>
            <span class="material-icons" ${meta}>${button.icon}</span>
        </div>
    `
};

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: state['textAlign'] === 'left' ? 'left' : 'left'},
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: state['textAlign'] === 'center' ? 'left' : 'center'},
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: state['textAlign'] === 'right' ? 'left' : 'right'},
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'underlined',
            value: {textDecoration: state['textDecoration'] === 'underlined' ? 'none' : 'underlined'},
        },
    ];
    return buttons.map(toButton).join('');
};