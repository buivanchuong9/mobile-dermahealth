# Dermahealth - quick device launchers.
#   make ios       iPhone simulator
#   make ipad      iPad simulator
#   make android   Android device or emulator
#   make start     Metro bundler only
#
# Override the target device, for example:
#   make ios IOS_DEVICE="iPhone 17 Pro Max"
#   make ipad IPAD_DEVICE="iPad Air 11-inch (M2)"
#   make android ANDROID_AVD=Pixel_8_API_35   (starts that emulator if none is running)

IOS_DEVICE ?= iPhone 17 Pro
IPAD_DEVICE ?= iPad Pro 11-inch (M4)
ANDROID_AVD ?=

RN := npx react-native
ANDROID_SDK ?= $(or $(ANDROID_HOME),$(HOME)/Library/Android/sdk)
ADB := $(ANDROID_SDK)/platform-tools/adb
EMULATOR := $(ANDROID_SDK)/emulator/emulator

.PHONY: help ios ipad android start

help:
	@echo "make ios       - run on iOS simulator ($(IOS_DEVICE))"
	@echo "make ipad      - run on iPad simulator ($(IPAD_DEVICE))"
	@echo "make android   - run on Android device/emulator"
	@echo "make start     - start Metro only"

ios:
	$(RN) run-ios --simulator "$(IOS_DEVICE)"

ipad:
	$(RN) run-ios --simulator "$(IPAD_DEVICE)"

android:
	@if ! $(ADB) devices | grep -qw device; then \
		if [ -n "$(ANDROID_AVD)" ]; then \
			echo "Starting emulator $(ANDROID_AVD)..."; \
			nohup $(EMULATOR) -avd "$(ANDROID_AVD)" >/dev/null 2>&1 & \
			$(ADB) wait-for-device; \
			until [ "$$($(ADB) shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do sleep 2; done; \
		else \
			echo "No Android device or emulator found."; \
			echo "Connect a device, or run: make android ANDROID_AVD=<name>"; \
			echo "Available emulators:"; $(EMULATOR) -list-avds || true; \
			exit 1; \
		fi; \
	fi
	$(RN) run-android

start:
	$(RN) start
