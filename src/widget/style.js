export const desktopWrapperStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 2147483647,
    borderRadius: '16px',
    background: '#ffffff',
    boxSizing: 'border-box',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
};

export const desktopClosedWrapperStyleChat = {
    position: 'fixed',
    bottom: '0px',
    right: '0px',
    zIndex: 2147483647,
    minWidth: '380px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    minHeight: '120px'
};

export const mobileClosedWrapperStyle = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 2147483647,
    borderRadius: '50%',
    background: 'transparent',
    boxSizing: 'border-box'
};

export const mobileOpenWrapperStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2147483647,
    width: '100%',
    height: '100%',
    background: '#ffffff',
    overflowY: 'visible',
    boxSizing: 'border-box'
};

export const desktopTitleStyle = {
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between',
    padding: '0 18px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
};

export const mobileTitleStyle = {
    height: 58,
    width: 58,
    cursor: 'pointer',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(31, 140, 235, 0.35)',
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease'
};
