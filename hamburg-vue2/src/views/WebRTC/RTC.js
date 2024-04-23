var zeroRTCengine;

export const zeroRTCengine = function(wsURL){
    this.init(wsURL)
    zeroRTCengine = this
    return this
}

zeroRTCengine.prototype.init = function(wsURL){
    this.wsURL = wsURL
    this.signaling = null
}

zeroRTCengine.prototype.createWebsocket = function(){
    zeroRTCengine = this
    zeroRTCengine.signaling = new WebSocket(this.wsURL)

    zeroRTCengine.signaling.onopen = function(){
        zeroRTCengine.onOpen()
    }

    zeroRTCengine.signaling.onMessage = function(ev){
        zeroRTCengine.onMessage(ev)
    }

    zeroRTCengine.signaling.onError = function(ev){
        zeroRTCengine.onError(ev)
    }

    zeroRTCengine.signaling.onClose = function(ev){
        zeroRTCengine.onClose(ev)
    }
}

zeroRTCengine.prototype.onOpen = function(){
    console.log("websocket open");
}
zeroRTCengine.prototype.onMessage = function(event){
    console.log("onMessage",event.data);
}
zeroRTCengine.prototype.onError = function(event){
    console.log("onError",event.data);
}
zeroRTCengine.prototype.onClose = function(event){
    console.log("onClose->code",event.code,"reason",event.reason);
}