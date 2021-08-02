const s = {
    getData: function (m) {
        const index = m.presence.activities.findIndex((e) => e.id === "spotify:1");
        if (index === -1) {
            return;
        } else {
            return m.presence.activities[index];
        }
    },
    isListening: function (m) {
        const index = m.presence.activities.findIndex((e) => e.id === "spotify:1");
        if (index === -1) {
            return false;
        } else {
            return true;
            
        }
    }
}

module.exports = s