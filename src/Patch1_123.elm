module Patch1_123 exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Message exposing (..)
import Style exposing (..)
import Animist
import Armsman
import Bainshee
import Bard
import Berserker
import Blademaster
import Bonedancer
import Cabalist
import Champion
import Cleric
import Druid
import Eldritch
import Enchanter
import Friar
import Healer
import Heretic
import Hero
import Hunter
import Infiltrator
import Mauler
import Mentalist
import Mercenary
import Minstrel
import Necromancer
import Nightshade
import Paladin
import Ranger
import Reaver
import Runemaster
import Savage
import Scout
import Shadowblade
import Shaman
import Skald
import Sorcerer
import Spiritmaster
import Thane
import Theurgist
import Valewalker
import Valkyrie
import Vampiir
import Warden
import Warlock
import Warrior
import Wizard


patch_1_123 : List (Html Message)
patch_1_123 =
    [h1 [] [text "Patch 1.123"],
     h2 [] [text "クラス全般"],
     text "新しいクラウドコントロール効果 Slow が導入される。",
     ulist ["Slow 状態のターゲットは戦闘時・非戦闘時両方で速度が低下する。",
            "Slow 状態に無効タイマーはない。",
            "Slow は root または snare と重複する。",
            "Slow 状態はダメージで解除されない。",
            "Slow 状態中の速度低下効果は一定である。徐々に解除されるようなことはない。",
            "root または snare 無効中であっても Slow 状態になる。",
            "Slow 効果は詠唱妨害ではない。"],
     text "Astral Blade of Illusions, Astral Conflagrant Short Sword, Astral Conflagrant Hatchet, Astral Voltaics 系武器, Traitor's Dagger の proc rate はやや減少する。",
     br [] [],
     text "Camelot Cleric, Jordheim Shaman, Tir na Nog Druid NPC の販売するベースAFバフの効果は125に強化される。",
     br [] [],
     text "NPCバフは Necromancer 本人にのみ適用されペットには影響しない。",
     h2 [] [text "バグ修正"],
     text "Loyalty Cloak の /use タイマーは正しく90秒になる。",
     br [] [],
     text "Loyal cloak を使うには cloak のレベルを 5 以上にする必要がある。以前は level 1 でアビリティーを使用可能だった cloak がある。",
     br [] [],
     text "マーセナリー、ブレードマスター、バーサーカー、ザベジは Loyal Cloak を再び使えるようになる。",
     br [] [],
     text "浅い水面の水が飛び散るアニメーションを変更しラグを大幅に削減した。"]
    ++ Animist.patch_1_123
    ++ Armsman.patch_1_123
    ++ Bainshee.patch_1_123
    ++ Bard.patch_1_123
    ++ Berserker.patch_1_123
    ++ Bonedancer.patch_1_123
    ++ Cabalist.patch_1_123
    ++ Champion.patch_1_123
    ++ Cleric.patch_1_123
    ++ Druid.patch_1_123
    ++ Enchanter.patch_1_123
    ++ Friar.patch_1_123
    ++ Heretic.patch_1_123
    ++ Hero.patch_1_123
    ++ Hunter.patch_1_123
    ++ Infiltrator.patch_1_123
    ++ Mauler.patch_1_123
    ++ Minstrel.patch_1_123
    ++ Necromancer.patch_1_123
    ++ Nightshade.patch_1_123
    ++ Paladin.patch_1_123
    ++ Ranger.patch_1_123
    ++ Reaver.patch_1_123
    ++ Scout.patch_1_123
    ++ Shadowblade.patch_1_123
    ++ Shaman.patch_1_123
    ++ Skald.patch_1_123
    ++ Spiritmaster.patch_1_123
    ++ Thane.patch_1_123
    ++ Valewalker.patch_1_123
    ++ Valkyrie.patch_1_123
    ++ Vampiir.patch_1_123
    ++ Warden.patch_1_123
    ++ Warlock.patch_1_123
    ++ Warrior.patch_1_123


patch_1_123B : List (Html Message)
patch_1_123B =
    [h1 [] [text "1.123B Live Patch Notes"]]
    ++ Bainshee.patch_1_123B
    ++ Bonedancer.patch_1_123B
    ++ Druid.patch_1_123B
    ++ Necromancer.patch_1_123B
    ++ Warlock.patch_1_123B


patch_1_123C : List (Html Message)
patch_1_123C =
    [h1 [] [text "1.123C Hot Fix"]]
    ++ Enchanter.patch_1_123C
    ++ Hunter.patch_1_123C
