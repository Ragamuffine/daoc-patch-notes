module Patch1_122 exposing (..)

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


patch_1_122B : List (Html Message)
patch_1_122B =
    [h1 [] [text "Patch 1.122B"],
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
    ++ Animist.patch_1_122B
    ++ Bainshee.patch_1_122B
    ++ Bard.patch_1_122B
    ++ Bonedancer.patch_1_122B ++ Cabalist.patch_1_122B
    ++ Champion.patch_1_122B
    ++ Cleric.patch_1_122B ++ Druid.patch_1_122B
    ++ Enchanter.patch_1_122B ++ Friar.patch_1_122B ++ Healer.patch_1_122B
    ++ Heretic.patch_1_122B ++ Hunter.patch_1_122B
    ++ Infiltrator.patch_1_122B
    ++ Minstrel.patch_1_122B
    ++ Necromancer.patch_1_122B ++ Nightshade.patch_1_122B ++ Paladin.patch_1_122B
    ++ Ranger.patch_1_122B
    ++ Savage.patch_1_122B ++ Scout.patch_1_122B ++ Shadowblade.patch_1_122B
    ++ Shaman.patch_1_122B ++ Skald.patch_1_122B ++ Sorcerer.patch_1_122B
    ++ Spiritmaster.patch_1_122B
    ++ Vampiir.patch_1_122B ++ Warden.patch_1_122B ++ Warlock.patch_1_122B


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h1 [] [text "Patch 1.122B Hot Fix"]]
    ++ Bonedancer.patch_1_122B_HotFix
    ++ Druid.patch_1_122B_HotFix
    ++ Enchanter.patch_1_122B_HotFix
    ++ Necromancer.patch_1_122B_HotFix
    ++ Paladin.patch_1_122B_HotFix


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h1 [] [text "Patch 1.122B Hot Fix #2"]]
    ++ Bonedancer.patch_1_122B_HotFix2
    ++ Cabalist.patch_1_122B_HotFix2
    ++ Champion.patch_1_122B_HotFix2
    ++ Enchanter.patch_1_122B_HotFix2
    ++ Minstrel.patch_1_122B_HotFix2
    ++ Necromancer.patch_1_122B_HotFix2
    ++ Savage.patch_1_122B_HotFix2
    ++ Skald.patch_1_122B_HotFix2
    ++ Spiritmaster.patch_1_122B_HotFix2


patch_1_122B_HotFix3 : List (Html Message)
patch_1_122B_HotFix3 =
    [h1 [] [text "Patch 1.122B Hot Fix #3"]]
    ++ Cabalist.patch_1_122B_HotFix3
    ++ Champion.patch_1_122B_HotFix3
    ++ Enchanter.patch_1_122B_HotFix3
    ++ Necromancer.patch_1_122B_HotFix3
    ++ Spiritmaster.patch_1_122B_HotFix3
    ++ Valewalker.patch_1_122B_HotFix3
