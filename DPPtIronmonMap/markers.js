var itemIcon = L.divIcon({
    className: 'itemIcon',
    iconSize: null,
    popupAnchor: [0, -10]
});
var hiddenIcon = L.divIcon({
    className: 'hiddenIcon',
    iconSize: null,
    popupAnchor: [0, -10]
});
var tmIcon = L.divIcon({
    className: 'tmIcon',
    iconSize: null,
    popupAnchor: [0, -10]
});
var berryIcon = L.divIcon({
    className: 'berryIcon',
    iconSize: null,
    popupAnchor: [0, -10]
});
var entranceIcon = L.divIcon({
    className: 'entrance',
    iconSize: null,
    popupAnchor: [0, -10]
});
var currentMap = "Overworld";
var tileSize = .25;
function markerSet(lat, lng, description, iconImage, world, returnLoc) {
    latf = lat * tileSize - (tileSize / 2);
    lngf = lng * tileSize + (tileSize / 2);
    var marker = L.marker([latf, lngf], {
        icon: iconImage,
        title: description
    });
    marker.name = description;
    marker.iconImage = iconImage;
    if (returnLoc) {
        marker.returnLoc = returnLoc;
    }
    marker.bindPopup(description);
    switch (iconImage) {
        case hiddenIcon:
            if (null == maps[world].hiddenLayer) {
                maps[world].hiddenLayer = L.layerGroup();
            }
            maps[world].hiddenLayer.addLayer(marker);
            break;
        case itemIcon:
            if (null == maps[world].itemLayer) {
                maps[world].itemLayer = L.layerGroup();
            }
            maps[world].itemLayer.addLayer(marker);
            break;
        case berryIcon:
            if (null == maps[world].berryLayer) {
                maps[world].berryLayer = L.layerGroup();
            }
            maps[world].berryLayer.addLayer(marker);
            break;
        case tmIcon:
            if (null == maps[world].tmLayer) {
                maps[world].tmLayer = L.layerGroup();
            }
            maps[world].tmLayer.addLayer(marker);
            break;
        case entranceIcon:
            if (null == maps[world].entranceLayer) {
                maps[world].entranceLayer = L.layerGroup();
            }
            maps[world].entranceLayer.addLayer(marker);
            break;
        default:
            console.warn("Unknown item type specified: " + iconImage)
    }
    marker.on('click', onClickEvent);
    // Hydrate collected state once the marker's DOM element is available
    marker.on('add', function () { _dpptHydrateMarker(marker); });
}

// ─────────────────────────────────────────────────────────────────────
// Persistence layer — clicking an item/berry/TM/hidden-item marker toggles
// a "collected" mark, persisted to localStorage with per-game namespacing
// based on the ?game= URL parameter passed in from the parent site.
// ─────────────────────────────────────────────────────────────────────
var DPPT_GAME_PARAM = (function () {
    try {
        var g = new URLSearchParams(window.location.search).get('game');
        return g || 'all';
    } catch (e) { return 'all'; }
})();
var DPPT_STORAGE_PREFIX = 'dpptMap_mark_' + DPPT_GAME_PARAM + '_';

function _dpptMarkerKey(target) {
    var ll = target.getLatLng ? target.getLatLng() : null;
    var cls = target.iconImage && target.iconImage.options ? target.iconImage.options.className : '';
    return cls + '@' + (ll ? ll.lat.toFixed(3) + ',' + ll.lng.toFixed(3) : '?') + ':' + (target.name || '');
}
function _dpptIsCollected(key) {
    try { return window.localStorage.getItem(DPPT_STORAGE_PREFIX + key) === '1'; } catch (e) { return false; }
}
function _dpptSetCollected(key, val) {
    try {
        if (val) window.localStorage.setItem(DPPT_STORAGE_PREFIX + key, '1');
        else window.localStorage.removeItem(DPPT_STORAGE_PREFIX + key);
    } catch (e) { /* ignore */ }
}
function _dpptApplyCollectedClass(marker, collected) {
    var el = marker._icon;
    if (!el) return;
    if (collected) el.classList.add('marker-collected');
    else el.classList.remove('marker-collected');
}
// After a marker layer is added to the map, hydrate visuals from localStorage.
function _dpptHydrateMarker(marker) {
    if (!marker || !marker.iconImage) return;
    var cls = marker.iconImage.options.className;
    if (cls === 'entrance') return; // entrances aren't collectible
    var key = _dpptMarkerKey(marker);
    if (_dpptIsCollected(key)) {
        // _icon may not be on DOM yet; defer slightly
        setTimeout(function () { _dpptApplyCollectedClass(marker, true); }, 30);
    }
}

function onClickEvent(e) {
    var t = e.target;
    var cls = t.iconImage && t.iconImage.options ? t.iconImage.options.className : '';
    if (cls === 'entrance') {
        if (t.returnLoc) loadMap(t.name, t.returnLoc);
        else loadMap(t.name);
        return;
    }
    // Toggle collected state for item/hidden/berry/TM markers
    var key = _dpptMarkerKey(t);
    var nowCollected = !_dpptIsCollected(key);
    _dpptSetCollected(key, nowCollected);
    _dpptApplyCollectedClass(t, nowCollected);
}
