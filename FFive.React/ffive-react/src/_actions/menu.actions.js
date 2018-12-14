export const menuActions = {
    tabClicked
};

const tabClicked = (activeTab) => {
    console.log('activeTab', activeTab);
    return {
        type: 'tabClicked',
        activeTab: activeTab
    };
};
