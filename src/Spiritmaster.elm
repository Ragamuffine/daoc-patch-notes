module Spiritmaster exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "スピリットマスター 1.121"],
     text "スピリットマスターはフルリスペックされる。",
     secmid "Suppression (スペック)",
     text "single target mez が変更される。",
     ulist ["Level 24 mez の時間は40秒に短縮される。",
            "Level 31 mez の時間は50秒に短縮される。",
            "Level 40 mez の時間は60秒に短縮される。",
            "Level 50 mez, Unmake Mind, は削除される。"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "スピリットマスター 1.122B"],
     text "スピリットマスターはフルリスペックされる。",
     secmid "Darkness (スペック)",
     ulist ["Level 47 - Distinguish Lifeforce のダメージは 179 から 199 に増加する。"],
     secmid "Summoning (基本)",
     text "ペットのレベルは詠唱者のレベルと等しくなる。",
     br [] [],
     text "新しいペットが追加される。",
     ulist ["Level 1 - Spirit Warrior - 詠唱6秒 - 40% power - このペットはタンクであり耐久性があるが速度は遅い。マスターの近くにいればマスターへの物理攻撃を 75% の確率でインターセプトする。背後からスタン、側面から Mangle, 正面から Plague でタウントを行う。魔法によるスタン、メツ、ルートの持続時間は 65% 短縮される。",
            "Level 11 - Spirit Hunter - 詠唱6秒 - 40% power - このペットは遠距離物理攻撃に特化している。弓で高ダメージを与える。弓の proc で小さな魔法ダメージを与える。このペットは spirit avatar を引き連れている。spirit avatar はマスターの 88% のレベルである。Spirit Hunter を妨害することはできない。",
            "Level 21 - Spirit Runemaster - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。1500レンジの cold デバフ DD と近視で攻撃を行う。このペットを妨害することはできない。",
            "Level 31 - Spirit Shaman - 詠唱6秒 - 40% power - 単体ルート、半径200の AoE 病気を詠唱する。味方をヒールするが攻撃を優先するのでヒールだけ行わせるには passive にする必要がある。このペットを物理攻撃すると病気になる。このペットを妨害することはできない。",
            "Level 41 - Spirit Valkyrie - 詠唱6秒 - 40% power - このペットは物理防御に特化している。Roundhouse スタイルチェーンを使う。Dex/Qui shear を行う。インスタント DD でターゲットを攻撃する。体力が低下すると PBAoE ヒールを行う。passive 状態にすると継続してヒールを行い、これを妨害することはできない。被ダメージがやや緩和されている。"],
     text "単体ペットヒールは以下のように調整される。",
     ulist ["Level 3 - Recover Spirit - 詠唱3秒 - 2000 range - 4 power - 46回復",
            "Level 13 - Reconstitute Spirit - 詠唱3秒 - 2000 range - 4 power - 81回復",
            "Level 23 - Rejuvenate Spirit - 詠唱3秒 - 2000 range - 4 power - 146回復",
            "Level 33 - Restore Spirit - 詠唱3秒 - 2000 range - 4 power - 201回復",
            "Level 43 - Regenerate Spirit - 詠唱3秒 - 2000 range - 4 power - 300回復"],
     text "グループAF増強バフが追加された。このバフはベースAF、スペックAFと重複する。バフボーナスと Summoning スキルに影響される。",
     ulist ["Level 7 - Shield of the Spirit - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 5増加",
            "Level 17 - Shield of the Jotun - 詠唱5秒 - 1500 range - 10% power - 10増加",
            "Level 27 - Shield of the Viking -詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 15増加",
            "Level 37 - Shield of the North - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 20増加",
            "Level 47 - Shield of the Einherjar - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 25増加"],
     text "単体ペット demezz 呪文 Awaken Spirit はレベル25に移動された。",
     secmid "Summoning (スペック)",
     text "蘇生呪文は以下のように調整される。",
     ulist ["Level 20 - Restore Spirit - 詠唱4秒 - 1500 range - 25% power - 10% HP 0% power で蘇生する。",
            "Level 40 - Spirit Revival - Instant cast - 1875 radius - 再使用10分 - 25% power - 25% HP 10% power で蘇生する。"],
     text "新しくペットインスタントヒールが追加される。",
     ulist ["Level 1 - Instant Recovery - Instant cast - 2000 range - 再使用3分 - 15 power - ペットの体力を10%回復",
            "Level 11 - Instant Replenishment - Instant cast - 2000 range - 再使用3分 - 25 power - ペットの体力を25%回復",
            "Level 21 - Instant Mending - Instant cast - 2000 range - 再使用3分 - 35 power - ペットの体力を35%回復",
            "Level 31 - Instant Aid - Instant cast - 2000 range - 再使用3分 - 45 power - ペットの体力を50%回復",
            "Level 41 - Instant Respite - Instant cast - 2000 range - 再使用3分 - 55 power - ペットの体力を75%回復"],
     text "新しく単体パワー転送スペルが追加される。",
     ulist ["Level 2 - Transfer Power - 詠唱3秒 - 1500 range - 25 power をターゲットに送る",
            "Level 12 - Transfer Essence - 詠唱3秒 - 1500 range - 40 power をターゲットに送る",
            "Level 22 - Transfer Force - 詠唱3秒 - 1500 range - 70 power をターゲットに送る",
            "Level 32 - Transfer Soul - 詠唱3秒 - 1500 range - 105 power をターゲットに送る",
            "Level 42 - Transfer Spirit - 詠唱3秒 - 1500 range - 150 power をターゲットに送る"],
     text "新しく PBAoE slow が追加される。",
     ulist ["Level 3 - Otherworldly Dissipation - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 11 power - 10% slow",
            "Level 13 - Otherworldly Explosion - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 23 power - 20% slow",
            "Level 23 - Otherworldly Banish - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 35 power - 30% slow",
            "Level 33 - Otherworldly Destruction - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 50 power - 50% slow",
            "Level 43 - Otherworldly Annihilation - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 62 power - 75% slow"],
     text "新しく単体パワー吸収スペルが追加される。",
     ulist ["Level 5 - Spirit Shock - 詠唱2.8秒 - 1500 range - 10 power - 24 spirit damage ダメージの 10% のパワーを得る",
            "Level 15 - Spirit Jolt - 詠唱2.8秒 - 1500 range - 21 power - 58 spirit damage ダメージの 10% のパワーを得る",
            "Level 25 - Spirit Burst - 詠唱2.8秒 - 1500 range - 29 power - 112 spirit damage ダメージの 10% のパワーを得る",
            "Level 35 - Spirit Siphon - 詠唱2.8秒 - 1500 range - 38 power - 143 spirit damage ダメージの 10% のパワーを得る",
            "Level 45 - Spirit Drain - 詠唱2.8秒 - 1500 range - 47 power - 189 spirit damage ダメージの 10% のパワーを得る"],
     text "新しく AoE ライフタップが追加される。",
     ulist ["Level 7 - Drain Area - 詠唱3秒 - 1500 range - 半径400 - 6 power - 28 spirit damage 詠唱者は与えたダメージの10%がヒールされる",
            "Level 17 - Drain Cluster - 詠唱3秒 - 1500 range - 半径400 - 15 power - Target takes 53 spirit damage 詠唱者は与えたダメージの10%がヒールされる",
            "Level 27 - Drain Circle - 詠唱3秒 - 1500 range - 半径400 - 26 power - Target takes 85 spirit damage 詠唱者は与えたダメージの10%がヒールされる",
            "Level 37 - Drain Pack - 詠唱3秒 - 1500 range - 半径400 - 34 power - Target takes 113 spirit damage 詠唱者は与えたダメージの10%がヒールされる",
            "Level 47 - Drain Formation - 詠唱3秒 - 1500 range - 半径400 - 45 power - Target takes 141 spirit damage 詠唱者は与えたダメージの10%がヒールされる"],
     text "フォーカスシールドは以下のように調整される。",
     ulist ["Level 9 - Spirit's Retaliation - 詠唱2.5秒 - 1350 range - 5 power/tick - ターゲットを物理攻撃する者は 6.8 spirit damage を受ける",
            "Level 19 - Spirit's Reckoning - 詠唱2.5秒 - 1350 range - 11 power/tick - ターゲットを物理攻撃する者は 15.1 spirit damage を受ける",
            "Level 29 - Spirit's Retribution - 詠唱2.5秒 - 1350 range - 15 power/tick - ターゲットを物理攻撃する者は 20.3 spirit damage を受ける",
            "Level 39 - Spirit's Vindication - 詠唱2.5秒 - 1350 range - 20 power/tick - ターゲットを物理攻撃する者は 27.1 spirit damage を受ける",
            "Level 49 - Spirit's Justification - 詠唱2.5秒 - 1350 range - 26 power/tick - ターゲットを物理攻撃する者は 33.9 spirit damage を受ける"],
     text "新しく打ちっ放し型のペットが追加される。",
     ulist ["Level 50 - Gates of Valhalla - 詠唱10秒 - 半径400 - 12秒ごと - 持続時間2分 - 再使用10分 - 25% power - Gates of Valhalla を詠唱した場所に開く。Einherjar が飛び出し半径内の敵プレイヤーを24秒間攻撃する。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
