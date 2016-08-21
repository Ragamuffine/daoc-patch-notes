module Vampiir exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヴァンピール 1.121"],
     text "ヴァンピールはフルリスペックされる。",
     sechib "Vampiric Emrabce (スペック)",
     text "fumble debuff は Shadow Mastery spec に移される。",
     text "NPC dismissal は削除される。",
     text "Vampiir's Blaze はレベル35に移動される。",
     br [] [],
     text "celerity buff は Shadow Mastery から Vampiric Emrabce に移される。",
     ulist ["レベル11, Darkened Swiftness",
            "レベル16, Darkened Quickness",
            "レベル29, Darkened Alacrity",
            "レベル36, Darkened Urgency",
            "レベル45, Darkened Haste"],
     text "自己 Weaponskill バフと自己 Evasion バフのタイマーは共有される。自己 Parry バフとのタイマーは共有されない。",
     sechib "Dementia (スペック)",
     text "skill bonus debuff は削除される。",
     text "effectiveness debuff は削除される。",
     br [] [],
     text "新しい instant cast 召喚ペットがレベル38 Dementia に追加される。このペットはヴァンピールの88%のレベルである。このペットがターゲットを攻撃するとターゲットのパワーを吸収しヴァンピールに転送する。(ターゲットがプレイヤーである場合のみ。)召喚するのに300パワーを使用する。最大5分間持続する。その前にリリースすることができる。再使用タイマーはない。",
     br [] [],
     text "召喚ペットを犠牲にするスキルがレベル42 Dementia に追加される。このスキルを使用するとペットを失うと同時にヴァンピールから root/snare 効果を取り除く。このスキルは攻撃中、移動中でも使用可能で妨害できない。再使用10分。詠唱時間3.5 秒。",
     sechib "Shadow Mastery (スペック)",
     text "fumble debuff は Shadow Mastery レベル11, 21, 32 に移される。",
     text "celerity buff は Vampiric Embrace spec に移される。",
     text "Vampiir's Speed はレベル10 SM に移される。",
     text "Flaring Claw はレベル18 SM に移される。",
     text "Vampiir's Strike はレベル19 SM に移される。",
     text "Renewal はレベル20 SM に移される。",
     text "レベル 32 Endurance Drain, Enervating Embrace は削除される。",
     sechib "Piercing Spec",
     text "新しいスタイル Vampiir's Bite が 45 Pierce に追加される。5 秒背後スタン。"]
