namespace config {
    export const ARCADE_SCREEN_WIDTH = 320 / 3.5 
    export const ARCADE_SCREEN_HEIGHT = 240 / 3.5 
}

interface Image {
    //% helper=imageFadeUntil 
    //% blockId=image_fadeUntil block="fadeUntil %x %y %ms=1000 %c"
    fadeUntil(x: number, y: number, ms: number, c: number): Image
    //% helper=imageClear
    //% blockId=image_clear block="clear"
    clear(): void
    //% helper=imageReplaceAllTo
    //% blockId=image_replaceAll block="replace all pixels"
    replaceAllPixels(src: Image, pixel: number): Image
}

namespace helpers {
    export function imageFadeUntil(x: number, y: number, ms: number, c: number): Image {
      let img = image.create(screen.width, screen.height)
      let locX = x 
      let locY = y

      if(ms <= 999) throw "Too Low Duration For Each Pixel Per Second"
      else if (ms >= 33000000) throw "Too High Duration For Each Pixel Per Second"

     game.onUpdate(() => {
         img.setPixel(locX += x * control.millis() / ms, locY += y * control.millis() / ms, c)
     })
     
      return img
    }
    

    export function imageClear() {
        screen.fill(0)
    }

    export function imageReplaceAllTo(src: Image, pixel: number): Image {
        for (let x = 0; x < src.width; x++) {
            for (let y = 0; y < src.height; y++) {
                let c = src.getPixel(x, y)
                if (c != 0) {             // skip transparent pixels
                    src.setPixel(x, y, 15) // set white

                    if (pixel) src.setPixel(x, y, pixel)
                }
            }
        }

      return src
    }
} 