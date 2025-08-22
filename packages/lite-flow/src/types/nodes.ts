const nodeTypeDef = {
    "start": {
        "type": "start",
        "text": "开始",
        "color": "#0820e2",
        "icon": "fa-solid fa-play",
    },
    "end": {
        "type": "end",
        "text": "结束",
        "color": "#5d1dd0",
        "icon": "fa-solid fa-stop",
    },
    "inclusive": {
        "type": "inclusive",
        "text": "包含网关",
        "color": "#f1711f",
        "icon": "fa-solid fa-genderless",
    },
    "exclusive": {
        "type": "exclusive",
        "text": "排他网关",
        "color": "#ae0e6a",
        "icon": "fa-solid fa-xmark",
    },
    "parallel": {
        "type": "parallel",
        "text": "并行网关",
        "color": "#7e48ee",
        "icon": "fa-solid fa-plus"
    },
    "activity": {
        "type": "activity",
        "text": "活动节点",
        "color": "#047cc2",
        "icon": "fa-solid fa-user",
    }
}

const groupMap = [
    {"text":"开关节点","value":"switch","nodes":["start","end"]},
    {"text":"网关节点","value":"gateway","nodes":["inclusive","exclusive","parallel"]},
    {"text":"活动节点","value":"activity","nodes":["activity"]}
]

export {nodeTypeDef,groupMap}