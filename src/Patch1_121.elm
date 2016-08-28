module Patch1_121 exposing (..)

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


patch_1_121 : List (Html Message)
patch_1_121 =
    [h1 [] [text "Patch 1.121"],
     h2 [] [text "クラス全般"],
     text "すべての root と mesmerization スペルの属性は以下のように変更になる。",
     dl [class "uk-description-list-horizontal"]
         [dt [] [text "アルビオン"],
          dd [] [text "energy"],
          dt [] [text "ミッドガルド"],
          dd [] [text "body"],
          dt [] [text "ヒベルニア"],
          dd [] [text "spirit"]],
     text "CC 属性に対する instant resist debuff が各レルムに追加される。",
     br [] [],
     text "Champion Level の disease の射程は 1500 から 1000 に減らされる。",
     br [] [],
     text "すべてのクラスは同時に 8 までの pulse を維持することができる。",
     br [] [],
     text "すべての resist debuff スペルの効果は中レベルでは25%から30%に強化される。高レベルでは40%から50%に強化される。",
     br [] [],
     text "キャスターの instant stat debuff スペルの再使用タイマーは10秒から7秒に短縮される。持続時間と効果はそのままである。",
     br [] [],
     text "melee style のダメージは調整される。",
     br [] [],
     text "buff shear から得られるレルムポイントは大幅に減らされる。",
     h2 [] [text "アイテム"],
     text "いくつかの CL15 武器が持つ fumble debuff は weapon skill debuff に変更される。",
     h2 [] [text "バトルマスターレベル"],
     text "グラップルは1分間の無効タイマーを持つ。ただし以下に出てくる新しいグラップルとはタイマーを共有しない。",
     br [] [],
     text "Essence Flames と Essence Shatter のダメージはやや減少させられる。",
     h2 [] [text "スパイマスターレベル"],
     text "Enduring Poison (ML3) は essence resist buff に変更される。",
     ulist ["Essence Armor - 25% essence resist buff - 自己バフ - 持続時間20分"],
     text "Essence Flare (ML9, Mez Poison) は武器攻撃を essence damage に変える自己バフになる。",
     ulist ["Essence Blades - 再使用5分 - instant cast – 持続時間10秒"],
     h2 [] [text "コンボーカーマスターレベル"],
     text "Convoker ML2 Prescience Node は詠唱時間2秒、再使用5分、持続時間5分になる。",
     text "ground target ではなくキャスターの足元に出現する。"]
    ++ Animist.patch_1_121 ++ Armsman.patch_1_121 ++ Bainshee.patch_1_121
    ++ Bard.patch_1_121
    ++ Berserker.patch_1_121 ++ Blademaster.patch_1_121
    ++ Bonedancer.patch_1_121 ++ Cabalist.patch_1_121 ++ Champion.patch_1_121
    ++ Cleric.patch_1_121 ++ Druid.patch_1_121 ++ Eldritch.patch_1_121
    ++ Enchanter.patch_1_121 ++ Friar.patch_1_121 ++ Healer.patch_1_121
    ++ Heretic.patch_1_121 ++ Hero.patch_1_121 ++ Hunter.patch_1_121
    ++ Infiltrator.patch_1_121 ++ Mauler.patch_1_121 ++ Mentalist.patch_1_121
    ++ Mercenary.patch_1_121 ++ Minstrel.patch_1_121
    ++ Necromancer.patch_1_121 ++ Nightshade.patch_1_121 ++ Paladin.patch_1_121
    ++ Ranger.patch_1_121 ++ Reaver.patch_1_121 ++ Runemaster.patch_1_121
    ++ Savage.patch_1_121 ++ Scout.patch_1_121 ++ Shadowblade.patch_1_121
    ++ Shaman.patch_1_121 ++ Skald.patch_1_121 ++ Sorcerer.patch_1_121
    ++ Spiritmaster.patch_1_121 ++ Thane.patch_1_121 ++ Theurgist.patch_1_121
    ++ Valewalker.patch_1_121 ++ Valkyrie.patch_1_121
    ++ Vampiir.patch_1_121 ++ Warden.patch_1_121 ++ Warlock.patch_1_121
    ++ Warrior.patch_1_121 ++ Wizard.patch_1_121


patch_1_121B : List (Html Message)
patch_1_121B =
    [h1 [] [text "Patch 1.121B"],
     h2 [] [text "ベインロード"],
     text "Agony Transmission の Health/Power/Endurance コストは60%から75%に増加する。",
     h2 [] [text "Archer"],
     seccommon "Stealth (スペック)",
     text "新しい能力 Heightened Awareness が Level 30 に追加される。",
     ulist ["Heightened Awareness - 持続時間6秒のバフを行う pulse を20分間継続する - pulse の周期は5秒 - グループターゲット - 10% stealth detection bonus - Archer, Assassin, ミンストレルには影響しない"],
     h2 [] [text "Assassin"],
     seccommon "Envenom (スペック)",
     text "DoT Poison",
     ulist ["Level 45 - Insidious Lethal Venom - DoT の初回のダメージを72から68に減少、第二撃のダメージを46から43に減少",
            "Level 50 - Lifebane - DoT の初回のダメージを88から82に減少、第二撃のダメージを88から82に減少"],
     text "Stat-Debuff Poison",
     br [] [],
     text "constitution debuff の効果を 50% 減少、Level 37 と Level 47 の Strength/Dexterity debuff の効果をやや減少。",
     ulist ["Level 7 - Weakening Poison - 6 Constitution",
            "Level 17 - Inhibiting Poison - 12 Constitution",
            "Level 27 - Enervating Poison - 15 Constitution",
            "Level 37 - Unnerving Poison - 20 Constitution, 40 Strength, 40 Dexterity",
            "Level 47 - Touch of Death - 30 Constitution, 55 Strength, 55 Dexterity"],
     text "weaponskill debuff の効果は変わらず。",
     br [] [],
     text "Mesmerize Poison",
     ulist ["Level 46 - Tranquilizing Miasma - 持続時間を15秒から10秒に減少"],
     seccommon "Critical Strike (スペック)",
     ulist ["Neck Shot - ダメージ大幅減少",
            "Rib Shot - ダメージ大幅減少",
            "Hip Shot - ダメージ大幅減少"],
     text "ただし wither 効果中の相手に対しては高ダメージのままである。",
     seccommon "Stealth (スペック)",
     text "新しい能力 Heightened Awareness が 45 stealth に追加される。",
     ulist ["Heightened Awareness - 持続時間20分のバフを6秒ごとに pulse する - 5秒ごとの pulse - group target - 10% stealth detection bonus - Archer, Assassin, Minstrel に対しては無効"]]
    ++ Bainshee.patch_1_121B ++ Champion.patch_1_121B ++ Friar.patch_1_121B
    ++ Hunter.patch_1_121B ++ Reaver.patch_1_121B
    ++ Savage.patch_1_121B ++ Shadowblade.patch_1_121B
    ++ Shaman.patch_1_121B ++ Valewalker.patch_1_121B ++ Valkyrie.patch_1_121B


patch_1_121C : List (Html Message)
patch_1_121C =
    [h1 [] [text "Patch 1.121C"],
     h2 [] [text "Archer"],
     text "Standard Shot の詠唱時間は4.0秒から4.2秒に増加する。",
     br [] [],
     text "Critical Shot のダメージはやや減少する。",
     ulist ["Level 5 - Critical Shot 1 のダメージは 15 から 14 に減少",
            "Level 11 - Critical Shot 2 のダメージは 50 から 48 に減少",
            "Level 17 - Critical Shot 3 のダメージは 90 から 88 に減少",
            "Level 23 - Critical Shot 4 のダメージは 129 から 126 に減少",
            "Level 29 - Critical Shot 5 のダメージは 168 から 164 に減少",
            "Level 35 - Critical Shot 6 のダメージは 209 から 204 に減少",
            "Level 41 - Critical Shot 7 のダメージは 248 から 242 に減少",
            "Level 47 - Critical Shot 8 のダメージは 288 から 285 に減少",
            "Level 50 - Critical Shot 9 のダメージは 308 から 305 に減少"],
     text "Power Shot のダメージは減少する。",
     ulist ["Level 3 - Power Shot 1 のダメージは 15 から 12 に減少",
            "Level 9 - Power Shot 2 のダメージは 50 から 45 に減少",
            "Level 15 - Power Shot 3 のダメージは 90 から 86 に減少",
            "Level 21 - Power Shot 4 のダメージは 129 から 123 に減少",
            "Level 27 - Power Shot 5 のダメージは 168 から 160 に減少",
            "Level 33 - Power Shot 6 のダメージは 209 から 194 に減少",
            "Level 39 - Power Shot 7 のダメージは 248 から 230 に減少",
            "Level 45 - Power Shot 8 のダメージは 288 から 279 に減少"],
     text "Critical Shot と Power Shot のダメージ無効時間は10秒から15秒に延長される。ただし最後の5秒間でダメージ緩和量が急速に縮小する。",
     br [] [],
     text "Heightened Awareness のステルス検知の効果は10%から20%に増加する。",
     h2 [] [text "Assassin"],
     text "Heightened Awareness のステルス検知の効果は10%から20%に増加する。",
     br [] [],
     text "Vanish の disarm と silence の持続時間は15秒から30秒に延長される。",
     br [] [],
     text "Level 39 Critical Strikes スタイル Stunning Stab の前提は Creeping Death から Hamstring に変更される。その効果は3% abs debuff から 10秒 wither に変更される。",
     br [] [],
     text "armor wither の debuff 量はやや増加する。そのため armor wither 状態のターゲットへの Shot スタイルを使用した場合のダメージは着実に増加するはずである。",
     br [] [],
     text "mesmerization poison は remedy 状態のターゲットにも適用されるようになる。mesmerization poison は「Envenom」の項目ではなく「Abilities」の項目に置かれるようになるが Envenom スペックであることは変わらない。"]
    ++ Animist.patch_1_121C ++ Friar.patch_1_121C ++ Hunter.patch_1_121C
    ++ Mercenary.patch_1_121C ++ Sorcerer.patch_1_121C
    ++ Vampiir.patch_1_121C
