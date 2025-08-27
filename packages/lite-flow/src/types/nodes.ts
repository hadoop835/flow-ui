const nodeTypeDef = {
    "start": {
        "type": "start",
        "text": "开始",
        "color": "#ffffff",
        "icon": "start",
    },
    "end": {
        "type": "end",
        "text": "结束",
        "color": "#ffffff",
        "icon": "end",
    },
    "if": {
        "type": "if",
        "text": "布尔节点",
        "color": "#ffffff",
        "icon": "if"
    },
    "switch": {
        "type": "switch",
        "text": "选择节点",
        "color": "#ffffff",
        "icon": "switch"
    },
    "for": {
        "type": "for",
        "text": "For循环",
        "color": "#ffffff",
        "icon": "for",
    },
    "iterator": {
        "type": "iterator",
        "text": "iterator循环",
        "color": "#ffffff",
        "icon": "iterator",
    },
    "common": {
        "type": "common",
        "text": "普通节点",
        "color": "#ffffff",
        "icon": "common",
    }
}


const groupMap = [
    {"text":"开关节点","value":"switch","nodes":["start","end"]},
    {"text":"节点","value":"gateway","nodes":["switch","if"]},
    {"text":"选择节点","value":"gateway","nodes":["switch","if"]},
    {"text":"循环节点","value":"loop","nodes":["for","iterator"]},
    {"text":"活动节点","value":"activity","nodes":["common"]}
]


export {nodeTypeDef,groupMap}