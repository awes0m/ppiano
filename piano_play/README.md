# piano_play

Programmable piano built with Flutter. Play notes via on-screen keys or your computer keyboard with left/right hand key bundles. Octaves can be shifted with arrow keys to access all 52 keys using the keyboard.

## Features
- **Two-hand keyboard mapping**: Left-hand (Z,S,X,D,C,V,G,B,H,N,J,M) and Right-hand (R,5,T,6,Y,U,8,I,9,O,0,P).
- **Octave shifting**:
  - **Up/Down arrows**: Shift the Left Hand octave.
  - **Left/Right arrows**: Shift the Right Hand octave.
- **Visual selection indicator (New)**:
  - The hand block you are adjusting is highlighted with a colored border and glow (Left or Right) to indicate the currently selected block while using arrow keys.
  - The selected octave on the piano is outlined directly on the keyboard to show the currently active octave for the selected hand.
- **Active key feedback**: Pressed keys on the piano briefly highlight to show which note is playing.
- **Mouse and Keyboard input**: Click keys or press mapped keyboard keys to play notes.

## Instructions
1. Click the on-screen piano keys to play notes, or use the keyboard mappings below.
2. Use the arrow keys to change octaves:
   - Up/Down arrows: change the Left Hand octave (Z,S,X,D,C,V,G,B,H,N,J,M).
   - Left/Right arrows: change the Right Hand octave (R,5,T,6,Y,U,8,I,9,O,0,P).
3. Watch the hand block highlight to know which side you’re adjusting.

## Keyboard Mappings
- **Left Hand**: `Z S X D C V G B H N J M`
- **Right Hand**: `R 5 T 6 Y U 8 I 9 O 0 P`

Run the app as a standard Flutter project on web, desktop, or mobile.
