# Arduino Build Inspector

The motivation of this project was to use [Arduino_STM32](https://github.com/rogerclarkmelbourne/Arduino_STM32 "rogerclarkmelbourne/Arduino_STM32: Arduino STM32. Hardware files to support STM32 boards, on Arduino IDE 1.8.x including LeafLabs Maple and other generic STM32F103 boards") in [SW4STM32](http://openstm32.org/HomePage "OpenSTM32 Community Site | HomePage"). It would dump some of config arduino-builder.exe used and you can use them to configure your IDE.

For example, to dump STM32F103CB, execute

```powershell
$ node.exe --experimental-modules .\main.mjs `
	"${env:LocalAppData}\Arduino15\packages\stm32duino\STM32F1\2019.2.3" `	# Platform location
	'genericSTM32F103C' `						# Variant
	menu.device_variant.STM32F103CB `				# Menu options, See boards.txt
	menu.upload_method.DFUUploadMethod `
	menu.cpu_speed.speed_72mhz `
	menu.opt.osstd `
	'runtime.ide.version=10809'					# Other defineds
```

and it will print

<details><summary>STM32F103CB Config Dump</summary>

```powershell
C Compiler Macros(-D)

DEBUG_LEVEL=DEBUG_NONE
BOARD_generic_stm32f103c
VECT_TAB_ADDR=0x8002000
ERROR_LED_PORT=GPIOC
ERROR_LED_PIN=13
F_CPU=72000000L
ARDUINO=10809
ARDUINO_GENERIC_STM32F103C
ARDUINO_ARCH_Arduino_STM32
SERIAL_USB
GENERIC_BOOTLOADER
MCU_STM32F103CB
__STM32F1__
ARDUINO_ARCH_STM32

C Compiler Search directioneries(-I)

C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\stm32f1\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\stm32f1
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\usb_lib
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c

C++ Compiler Macros(-D)

DEBUG_LEVEL=DEBUG_NONE
BOARD_generic_stm32f103c
VECT_TAB_ADDR=0x8002000
ERROR_LED_PORT=GPIOC
ERROR_LED_PIN=13
F_CPU=72000000L
ARDUINO=10809
ARDUINO_GENERIC_STM32F103C
ARDUINO_ARCH_Arduino_STM32
SERIAL_USB
GENERIC_BOOTLOADER
MCU_STM32F103CB
__STM32F1__
ARDUINO_ARCH_STM32

C++ Compiler search directioneries(-I)

C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\stm32f1\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\stm32f1
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\usb_lib
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c

Linker script(-T)

C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c\ld\bootloader_20.ld

Linker search directories(-L)

C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c\ld
{build.path}

Assemblier search directories(-I)

C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\stm32f1\include
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\stm32f1
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system\libmaple\usb\usb_lib
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple
C:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c

C Compiler Recipe

"{runtime.tools.arm-none-eabi-gcc.path}/bin/arm-none-eabi-gcc" -c -g -Os -w -DDEBUG_LEVEL=DEBUG_NONE -std=gnu11 -MMD -ffunction-sections -fdata-sections -nostdlib --param max-inline-insns-single=500 -DBOARD_generic_stm32f103c -DVECT_TAB_ADDR=0x8002000 -DERROR_LED_PORT=GPIOC -DERROR_LED_PIN=13 -mcpu=cortex-m3 -DF_CPU=72000000L -DARDUINO=10809 -DARDUINO_GENERIC_STM32F103C -DARDUINO_ARCH_Arduino_STM32  -DSERIAL_USB -DGENERIC_BOOTLOADER -DMCU_STM32F103CB  -mthumb  -march=armv7-m -D__STM32F1__ -DARDUINO_ARCH_STM32 "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/stm32f1/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/stm32f1" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/usb_lib" -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c "{source_file}" -o "{object_file}"

C++ Compiler Recipe

"{runtime.tools.arm-none-eabi-gcc.path}/bin/arm-none-eabi-g++" -c -g -Os -w -DDEBUG_LEVEL=DEBUG_NONE -std=gnu++11 -MMD -ffunction-sections -fdata-sections -nostdlib --param max-inline-insns-single=500 -fno-rtti -fno-exceptions -DBOARD_generic_stm32f103c -DVECT_TAB_ADDR=0x8002000 -DERROR_LED_PORT=GPIOC -DERROR_LED_PIN=13 -mcpu=cortex-m3 -DF_CPU=72000000L -DARDUINO=10809 -DARDUINO_GENERIC_STM32F103C -DARDUINO_ARCH_Arduino_STM32  -DSERIAL_USB -DGENERIC_BOOTLOADER -DMCU_STM32F103CB  -mthumb  -march=armv7-m -D__STM32F1__ -DARDUINO_ARCH_STM32 -DMCU_STM32F103CB  -mthumb  -march=armv7-m -D__STM32F1__ -DARDUINO_ARCH_STM32 "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/stm32f1/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/stm32f1" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/usb_lib" -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c "{source_file}" -o "{object_file}"

Assemblier Recipe

"{runtime.tools.arm-none-eabi-gcc.path}/bin/arm-none-eabi-gcc" -c -g -x assembler-with-cpp -MMD -mcpu=cortex-m3 -DF_CPU=72000000L -DARDUINO=10809 -DARDUINO_GENERIC_STM32F103C -DARDUINO_ARCH_Arduino_STM32  -DSERIAL_USB -DGENERIC_BOOTLOADER -DMCU_STM32F103CB  -mthumb  -march=armv7-m -D__STM32F1__ -DARDUINO_ARCH_STM32 -DMCU_STM32F103CB  -mthumb  -march=armv7-m -D__STM32F1__ -DARDUINO_ARCH_STM32 "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/stm32f1/include" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/stm32f1" "-IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\system/libmaple/usb/usb_lib" -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\cores\maple -IC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c "{source_file}" -o "{object_file}"

Linker Recipe

"{runtime.tools.arm-none-eabi-gcc.path}/bin/arm-none-eabi-g++" -Os -Wl,--gc-sections  -mcpu=cortex-m3 "-TC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c/ld/bootloader_20.ld" "-Wl,-Map,{build.path}/{build.project_name}.map" "-LC:\Users\xymopen\AppData\Local\Arduino15\packages\stm32duino\STM32F1\2019.2.3\variants\generic_stm32f103c/ld" -o "{build.path}/{build.project_name}.elf" "-L{build.path}" -lm -lgcc -mthumb -Wl,--cref -Wl,--check-sections -Wl,--gc-sections -Wl,--unresolved-symbols=report-all -Wl,--warn-common -Wl,--warn-section-align -Wl,--warn-unresolved-symbols -Wl,--start-group {object_files} "{archive_file_path}" -Wl,--end-group
```

</details>

## Reference
[Arduino IDE 1.5 3rd party Hardware specification](https://github.com/arduino/Arduino/wiki/Arduino-IDE-1.5-3rd-party-Hardware-specification "Arduino IDE 1.5 3rd party Hardware specification · arduino/Arduino Wiki")
