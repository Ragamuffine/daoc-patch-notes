module Savage exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "サヴェジ 1.121"],
     text "サヴェジはフルリスペックされる。",
     text "サヴェジはレルムアビリティーをリスペックされる。",
     text "サヴェジのレルムアビリティーからチャージがなくなる。",
     text "サヴェジはレベル上昇に伴ってチャージを習得する。",
     ulist ["Level 30 - Charge 1",
            "Level 35 - Charge 2",
            "Level 40 - Charge 3",
            "Level 45 - Charge 4",
            "Level 50 - Charge 5"],
     secmid "Light Tank Stances",
     text "スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。",
     dl [class "uk-description-list-horizontal"]
         [dt [] [text "War Stance"],
          dd [] [text "デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。"],
          dt [] [text "Wild Stance"],
          dd [] [text "ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。(これはサヴェジのダメージバフとスタックしない。サヴェジのダメージバフの方が効果が高い。)敵からの物理・魔法攻撃のダメージが 25% 上昇する。"],
          dt [] [text "Frenzy Stance"],
          dd [] [text "移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。"]],
     secmid "Hand to Hand (スペック)",
     ulist ["Level 6 - Wild Call - Anytime - ダメージ減少",
            "Level 8 - Clan's Call - Rear - 5秒スタン",
            "Level 18 - Clan's Might - Clan's Call - 11秒 hinder"],
     secmid "Axe (スペック)",
     ulist ["Level 15 - Evernight - Rear - スネア削除, ダメージやや増加",
            "Level 29 - Havoc - Anytime - ダメージ減少",
            "Level 39 - Glacial Movement - Side - ダメージ増加",
            "Level 44 - Arctic Rfit - Evernight - ダメージ増加",
            "Level 50 - Tyr's Fury - Glacial Movement - ダメージやや増加"],
     secmid "Hammer (スペック)",
     ulist ["Level 18 - Demolish - Frost Hammer - ダメージ増加",
            "Level 29 - Conquer - Rear - スネア削除, ダメージやや増加",
            "Level 32 - Comminute - Anytime - ダメージ減少",
            "Level 44 - Sledgehammer - Conquer - ダメージ増加"],
     secmid "Sword (スペック)",
     ulist ["Level 15 - Aurora - Northern Lights - ダメージやや増加",
            "Level 29 - Rush - Side - 15秒 hinder",
            "Level 34 - Polar Rift - Anytime - ダメージ減少",
            "Level 50 - Ragnarok - Rear - スネア削除, ダメージ増加"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "サヴェジ 1.121B"],
     secmid "Savagery (スペック)",
     text "endurance heal スペルは最上位のスペルのみ有効になる。",
     br [] [],
     text "endurance heal バフのコストは増加する。",
     ulist ["Level 20 - Kelgor's Gift - 5% から 10% health に増加",
            "Level 29 - Kegor's Boon - 10% から 15% health に増加",
            "Level 41 - Kelgor's Reward - 15% から 20% health に増加"],
     text "evasion 自己バフのコストは増加する。",
     ulist ["Level 2 - Swiftness of Kelgor - 2% から 4% health に増加",
            "Level 10 - Alacrity of Kelgor - 3% から 5% health に増加",
            "Level 19 - Speed of Kelgor - 3% から 6% health に増加",
            "Level 28 - Fleetness of Kelgor - 4% から 7% health に増加",
            "Level 37 - Quickness of Kelgor - 4% から 8% health に増加",
            "Level 45 - Evasion of Kelgor - 5% から 10% health に増加"],
     secmid "Hand to Hand (スペック)",
     ulist ["Level 8 - Clan's Call - Rear - スタン時間を5秒から4秒に短縮",
            "Level 18 - Clan's Might - Clan's Call - スネア除去"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "サヴェジ 1.122B"],
     secmid "Savagery (スペック)",
     text "すべての自己バフは有効期間が終わった時ではなく能力を使った時にヘルスコストが適用されるようになる。",
     br [] [],
     text "自己ヘイストバフは全レベルで5%のヘルスコストとなる。",
     br [] [],
     text "自己 parry バフは全レベルで5%のヘルスコストとなる。",
     br [] [],
     text "自己 evasion バフは全レベルで5%のヘルスコストとなる。このバフの有効期間内では Frenzy スタンスはもはや Einherjar weapon を proc しなくなる。",
     text "自己 melee ダメージ増加バフは全レベルで5%のヘルスコストとなる。このバフの有効期間内では Frenzy スタンスはもはや Einherjar weapon を proc しなくなる。",
     br [] [],
     text "物理レジストバフは3種類の物理レジストすべてを増加させる単一のバフになる。",
     ulist ["Level 6 - Deflect Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 5% 増加",
            "Level 14 - Bear Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 9% 増加",
            "Level 23 - Withstand Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 13% 増加",
            "Level 31 - Endure Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 17% 増加",
            "Level 40 - Weather Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 21% 増加",
            "Level 47 - Ignore Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 25% 増加"],
     text "新しいレジストを獲得するにはリスペックをする必要がある。",
     br [] [],
     text "Blissful Ignorance の再使用タイマーは5分から10分に増加する。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B ++ patch_1_122B
