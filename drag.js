let drag = {
    curr: null,
    init: function () {
        let dragitem = document.getElementsByClassName('box')
        for (let item of dragitem) {
            item.addEventListener("dragstart", drag.dragstart)
            item.addEventListener("dragend", drag.dragend)
        }

        let containers = document.getElementsByClassName('dragged')
        for (let item of containers) {
            if (!item.attributes['dragmax'] && item.attributes['dragcontent']) {
                var dragmax = document.createAttribute("dragmax");
                dragmax.nodeValue = '1'
                item.attributes.setNamedItem(dragmax)
            }
            item.addEventListener("dragover", drag.dragover)
            item.addEventListener("dragenter", drag.dragenter)
            item.addEventListener("dragleave", drag.dragleave)
            item.addEventListener("drop", drag.drop)
        }
    },
    dragstart: function (e) {
        this.className += " hold"
        drag.curr = e.target
        setTimeout(() => this.className = "invisible", 0)
    },
    dragend: function () {
        this.className = "box"
    },
    dragover(e) {
        e.preventDefault()
    },
    dragenter(e) {
        e.preventDefault()
        if (this.attributes['dragcontent'])
            this.className += " hoveredOf"
        else
            this.className += " hoveredDisable"

    },
    dragleave: function () {
        this.className = "dragged"
    },
    drop: function () {
        this.className = "dragged"
        if (this.attributes['dragcontent']) {
            if (this.children.length + 1 > this.attributes['dragmax'].value) {
            } else {
                this.append(drag.curr)
            }
        } else {
            console.log('cant drop')
        }
    }
}


document.addEventListener("DOMContentLoaded", drag.init)

function dragstart_handler(ev) {
    // console.log("dragStart");
    ev.dataTransfer.setData("text/plain", ev.target.id);
}