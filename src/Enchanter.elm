module Enchanter exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "エンチャンター 1.121"],
     text "エンチャンターはフルリスペックされる。",
     sechib "Mana Magic (スペック)",
     text "新しい single target instant haste debuff が追加される。",
     ulist ["Level 5 - Distracting Scintillation - Instant cast - 1500 range - 45秒間継続 - 5 power - 攻撃速度低下 14%.",
            "Level 17 - Blinding Scintillation - Instant cast - 1500 range - 45秒間継続 - 12 power - 攻撃速度低下 22%.",
            "Level 25 - Disturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 17 power - 攻撃速度低下 24%.",
            "Level 37 - Perturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 23 power - 攻撃速度低下 31%.",
            "Level 48 - Agitating Scintillation - Instant cast - 1500 range - 45秒間継続 - 31 power - 攻撃速度低下 38%."],
     sechib "Light Magic (スペック)",
     text "single target instant haste debuff は Mana Magic に移される。instant AoE haste debuff は残る。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "エンチャンター 1.122B"],
     text "エンチャンターはフルリスペックされる。",
     sechib "Enchantments (基本)",
     text "グループスピード呪文の効果はバードと同じレベルまで強化される。",
     ulist ["Level 5 - Lesser Effervescence - 126% から 144% に",
            "Level 15 - Effervescence - 133% から 156% に",
            "Level 25 - Greater Effervescence - 141% から 174% に",
            "Level 35 - Superior Effervescence - 148% から 189% に",
            "Level 45 - Maximum Effervescence - 176% から 204% に"],
     text "単体 root は調整される。",
     ulist ["Level 9 - Dazzling Clutch - 詠唱時間2.5秒 - 1500 range - 持続時間23秒 - 7 power",
            "Level 19 - Dazzling Grip - 詠唱時間2.5秒 - 1500 range - 持続時間33秒 - 12 power",
            "Level 29 - Dazzling Hold - 詠唱時間2.5秒 - 1500 range - 持続時間44秒 - 17 power",
            "Level 39 - Dazzling Embrace - 詠唱時間2.5秒 - 1500 range - 持続時間57秒 - 23 power",
            "Level 49 - Dazzling Restraint - 詠唱時間2.5秒 - 1500 range - 持続時間69秒 - 29 power"],
     text "単体ペットヒールは調整される。",
     ulist ["Level 3 - Support Ally - 詠唱3秒 - 2000 range - 46回復",
            "Level 13 - Invest Ally - 詠唱3秒 - 2000 range - 81回復",
            "Level 23 - Infuse Ally - 詠唱3秒 - 2000 range - 146回復",
            "Level 33 - Imbue Ally - 詠唱3秒 - 2000 range - 201回復",
            "Level 43 - Succor Ally - 詠唱3秒 - 2000 range - 300回復"],
     text "ペットは召喚者のレベルと等しくなる。",
     br [] [],
     text "新しいペットが追加される。",
     ulist ["Level 1 - Underhill Companion - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。heat DD でターゲットを攻撃する。ターゲットの heat レジストデバフを行う。ターゲットの詠唱ミスを引き起こす。",
            "Level 11 - Underhill Compatriot - 詠唱6秒 - 40% power - このペットはタンクである。背後から Annihilation を行う。側面から Domination を行う。parry 後は Ultimate Recovery を行う。ターゲットを Celtic Fury でタウントする。魔法および物理攻撃へのレジストはとても高い。",
            "Level 21 - Underhill Ally - 詠唱6秒 - 40% power - このペットは魔法支援に特化している。このペットはダメージを受けた味方をヒールする。passive 状態の時はヒールし続け敵に妨害されることはない。味方に health regeneration バフと 5% の物理レジストバフをかける。",
            "Level 31 - Underhill Stalker - 詠唱6秒 - 40% power - このペットは物理攻撃に特化している。このペットは極めて高い物理攻撃力があるが防御は弱い。critical strike スタイルを多用する。武器は Lifebane に覆われている。被ダメージをわずかに緩和する。",
                "Level 41 - Underhill Zealot - 詠唱6秒 - 40% power - このペットは魔法で攻撃を行う。すべての tick が妨害をする DoT を詠唱する。ターゲットの dexterity をデバフする。"],
     sechib "Enchanting (Enchantments スペック)",
     text "新しい body DD スペルが追加される。",
     ulist ["Level 4 - Dazzling Glimmer - 詠唱2.6秒 - 1500 range - 34 body damage",
            "Level 14 - Dazzling Flicker - 詠唱2.6秒 - 1500 range - 68 body damage",
            "Level 24 - Dazzling Shimmer - 詠唱2.6秒 - 1500 range - 122 body damage",
            "Level 34 - Dazzling Flash - 詠唱2.6秒 - 1500 range - 153 body damage",
            "Level 44 - Dazzling Beam - 詠唱2.6秒 - 1500 range - 199 body damage"],
     text "新しくヒールボーナススペルが追加される。",
     ulist ["Level 9 - Calming Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス10%増加",
            "Level 19 - Peaceful Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス20%増加",
            "Level 29 - Harmonic Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス40%増加",
            "Level 39 - Serene Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス65%増加",
            "Level 49 - Graceful Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス100%増加"],
     text "新しく魔法吸収バフを追加する。このバフは消滅後60秒間は同じタイプのバフを同一ターゲットにかけることはできない。",
     ulist ["Level 1 - Enchanted Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 30",
            "Level 11 - Magic Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 150",
            "Level 21 - Empowered Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 350",
            "Level 31 - Arcane Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 750",
            "Level 41 - Mana Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 1500"],
     text "新しくグループ強化スペルが追加される。同時に一つのスペルのみ有効である。",
     ulist ["Level 6 - Enchantment of Ice - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が cold になり物理攻撃はターゲットを 50% slow にする。",
            "Level 16 - Enchantment of Stone - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が matter になり armor factor が 300 増加する。",
            "Level 26 - Enchantment of Fire - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が heat になり物理ダメージが 25% 増加する。",
            "Level 36 - Enchantment of Mana - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃がターゲット周辺に 325 energy ダメージを与える。ただしターゲットには影響はない。",
            "Level 46 - Enchantment of Truth - 詠唱2.4秒 - 4000 range - 持続時間15秒 - 30% power - 物理攻撃が 100% ヒットする。ブレードターンを貫通する。",
            "Level 50 - Enchantment of Zeal - 10s cast - 4000 range - 持続時間30秒 - 再使用5分 - 30% power - コンバットスタイルのダメージボーナスを3倍にする。スタイルダメージを与えた分、自グループをヒールする。"]]


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h2 [] [text "エンチャンター 1.122B Hot Fix"],
     text "“Enchantment of …”の呪文はグループメンバーに対して正しく上書きするようになる。",
     br [] [],
     text "Underhill Ally の health regeneration は削除される。この能力はバードのヒールソングと衝突している。物理レジストバフだけでも充分に強力である。",
     br [] [],
     text "レベル 48 の PBAoE スペルのダメージが正しい値になる。",
     br [] [],
     text "The Loyal Enchanter class cloak の半径増加のアビリティーはグループメンバーに対して正しく機能する。",
     br [] [],
     text "The Enchantment of Mana の効果はすべてのクラスに対して正しく機能するはずである。"]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "エンチャンター 1.122B Hot Fix #2"],
     text "Enchantment of Mana のだめーじは 325 から 275 に減少する。再使用タイマーは60秒になる。",
     br [] [],
     text "すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。",
     br [] [],
     text "Mana Barrier のバフを右クリックで除去して無効時間の発生を防ぐことはもはやできなくなる。"]


patch_1_122B_HotFix3 : List (Html Message)
patch_1_122B_HotFix3 =
    [h2 [] [text "エンチャンター 1.122B Hot Fix #3"],
     text "Enchantment of Mana バフは以下のように修正される。",
     ulist ["proc 率が 100% から 33% に低下する。",
            "pbaoe ダメージは Enchanter のレベルに比例する。レベル50時点でのダメージは275のまま変わらない。"],
     text "Enchantment of Zeal の再使用タイマーは5分から10分に増加する。",
     br [] [],
     text "Heal Effectiveness バフの有効時間は45秒から30秒に短縮される。",
     br [] [],
     text "Underhill Stalker ペットの物理防御は減少する。"]


patch_1_122B_HotFix4 : List (Html Message)
patch_1_122B_HotFix4 =
    [h2 [] [text "エンチャンター 1.122B Hot Fix #4"],
     text "Underhill Stalker ペットの移動速度がやや低下する。"]


patch_1_122B_HotFix5 : List (Html Message)
patch_1_122B_HotFix5 =
    [h2 [] [text "エンチャンター 1.122B Hot Fix #5"],
     text "Underhill Stalker ペットのスタイルダメージがやや低下する。"]


patch_20170117 : List (Html Message)
patch_20170117 =
    [h2 [] [text "エンチャンター Changes - 1/17/17"],
     text "Underhill Stalker ペットのスタイルから Achilles Heel と Leaper を削除する。これらのスタイルは Summon Mastery (ML9) と組み合わせるとダメージが大きすぎ、他国の物理攻撃ペットとの整合性が取れなくなるためである。"]


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "エンチャンター Hot Fix Changes - 2/2/17"],
     sechib "Enchantments (基本)",
     text "ペットは以下のように変更される。",
     ulist ["Underhill Compatriot - 移動速度が普通になる。",
            "Underhill Ally - 物理ダメージ吸収がなくなる。ヒールの詠唱時間が0.2秒増加する。",
            "Underhill Stalker - 毒はバフによって変化する。エンチャンターは毒を使うためにはスペックしなければならない。すべての毒デバフ(Lifebane以外)の持続時間は15秒になる。Enchantment of Ice - Touch of Death, Enchantment of Earth - Swordbreaker, Enchantment of Fire - Lifebane, Enchantment of Mana - Widow Venom."]]


patch_1_122C : List (Html Message)
patch_1_122C =
    [h2 [] [text "エンチャンター 1.122C"],
     sechib "Enchantments (基本)",
     text "Underhill Stalker の anytime スタイルはブリードしなくなる。",
     text "Underhill Companion, Underhill Ally が妨害を受けない確率は100%から25%に減少する。",
     text "Underhill Zealot が妨害を受けない確率は75%から25%に減少する。",
     text "Underhill Compatriot の移動速度は低下する。Underhill Stalker はスタンをしなくなる。",
     sechib "Enchanting (Enchantments スペック)",
     text "Enchantment of Ice の slow 効果は snare になる。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "エンチャンター 1.123"],
     text "Enchantment of Mana の proc 率は50%まで増加する。",
     text "Underhill Stalker のダメージは25%低下する。",
     text "Underhill Compatriot はプレイヤーから攻撃をされると2倍のダメージを受ける。PvEでは変わらない。",
     text "Underhill Companion のダメージは25%低下する。デバフDDの効果は以下のように調整される。",
     ulist ["レベル1-23ペットではデバフの効果は10%",
            "レベル24-43ペットではデバフの効果は20%",
            "レベル44-50ペットではデバフの効果は30%"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix
      ++ patch_1_122B_HotFix2
      ++ patch_1_122B_HotFix3
      ++ patch_1_122B_HotFix4
      ++ patch_1_122B_HotFix5
      ++ patch_20170117
      ++ patch_20170202
      ++ patch_1_122C
      ++ patch_1_123
