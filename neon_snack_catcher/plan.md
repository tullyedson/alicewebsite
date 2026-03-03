# Neon Snack Catcher - Design Plan

## Overview
A 2D HTML5 Canvas game where Alice catches snacks and avoids glitches.

## Gameplay
- **Controls:** Left/Right arrows or A/D keys.
- **Goal:** Catch falling snacks (blueberries/watermelons) to increase score.
- **Obstacles:** Avoid red glitch blocks. Hitting one triggers Game Over.
- **Progression:** Speed increases every 10 points.

## Assets
- `fox_sprite.png`: Player character.
- `snack_blue.png`: +1 point.
- `snack_pink.png`: +5 points.
- `glitch_block.png`: Obstacle.
- `background.png`: Neon city backdrop.

## File Structure
- `index.html`: Game container and UI.
- `style.css`: Neon aesthetics.
- `game.js`: Movement, collision, and spawning logic.