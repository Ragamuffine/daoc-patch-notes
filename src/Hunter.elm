module Hunter exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ハンター 1.121"],
     text "ハンターはフルリスペックされる。",
     text "ハンターはレルムアビリティーをリスペックされる。",
     br [] [],
     text "すべてのアーチャーは Level 50 で Remedy を得る。Remedy は再使用 5 分でもはや HP を失わない。毒に対する耐性を 60 秒間維持する。",
     br [] [],
     text "すべてのアーチャーは Mastery of Stealth を獲得する。",
     ulist ["Level 10 - Mastery of Stealth 1",
            "Level 15 - Mastery of Stealth 2",
            "Level 20 - Mastery of Stealth 3",
            "Level 25 - Mastery of Stealth 4",
            "Level 30 - Mastery of Stealth 5",
            "Level 35 - Mastery of Stealth 6",
            "Level 40 - Mastery of Stealth 7",
            "Level 45 - Mastery of Stealth 8",
            "Level 50 - Mastery of Stealth 9"],
     text "Mastery of Stealth の移動速度への効果は減少する。",
     ulist ["Mastery of Stealth 1 の移動速度は +10% のままである",
            "Mastery of Stealth 2 の移動速度は +15% から +13% に減少する",
            "Mastery of Stealth 3 の移動速度は +20% から +16% に減少する",
            "Mastery of Stealth 4 の移動速度は +25% から +19% に減少する",
            "Mastery of Stealth 5 の移動速度は +30% から +22% に減少する",
            "Mastery of Stealth 6 の移動速度は +35% から +25% に減少する",
            "Mastery of Stealth 7 の移動速度は +40% から +28% に減少する",
            "Mastery of Stealth 8 の移動速度は +45% から +31% に減少する",
            "Mastery of Stealth 9 の移動速度は +50% から +34% に減少する"],
     text "50 stealth MOS9 を持つアーチャーはステルス中に通常速度の80%で移動する。",
     secmid "Archery (スペック)",
     text "damage add スペルは削除される。",
     br [] [],
     text "Critical Shot のダメージは増加する。",
     ulist ["Critical Shot 1 のダメージは 12 から 15 へ増加",
            "Critical Shot 2 のダメージは 38 から 50 へ増加",
            "Critical Shot 3 のダメージは 79 から 90 へ増加",
            "Critical Shot 4 のダメージは 106 から 129 へ増加",
            "Critical Shot 5 のダメージは 132 から 168 へ増加",
            "Critical Shot 6 のダメージは 185 から 209 へ増加",
            "Critical Shot 7 のダメージは 212 から 248 へ増加",
            "Critical Shot 8 のダメージは 239 から 288 へ増加",
            "Critical Shot 9 のダメージは 265 から 308 へ増加"],
     text "アーチャーの Critical Shot ペナルティーが -50% から -75% に増加する。",
     text "Standard Shot は 5 秒から 4.0 秒になる。",
     text "Elemental Shot は 7 秒から 5.0 秒になる。ダメージタイプが以下のようになる。",
     ulist ["Hunter: Benthic (cold), Tempestuous (spirit)",
            "Ranger: Pyroclasmic (heat), Entropic (energy)",
            "Scout: Lithic (matter), Somatic (body)"],
     text "Power shot は 6 秒から 3.5 秒になり、dex により修正される。",
     br [] [],
     text "Power shot のダメージは増加する。",
     ulist ["Power Shot 1 のダメージは 12 から 15 へ増加",
            "Power Shot 2 のダメージは 38 から 50 へ増加",
            "Power Shot 3 のダメージは 79 から 90 へ増加",
            "Power Shot 4 のダメージは 106 から 129 へ増加",
            "Power Shot 5 のダメージは 132 から 168 へ増加",
            "Power Shot 6 のダメージは 185 から 209 へ増加",
            "Power Shot 7 のダメージは 212 から 248 へ増加",
            "Power Shot 8 のダメージは 239 から 288 へ増加"],
     text "Power Shot は bladeturn を貫通する。ブロックされない。",
     text "Power shot は再使用20秒となる。",
     text "Power shot はアーチャーのダメージペナルティーの対象となる。",
     text "Rapid Fire shot は前方 90 度の cone AoE (FAE) となる。半径 700。",
     br [] [],
     text "新しく root shot が追加される。再使用20秒。",
     ulist ["Level 18 - Bola Shot 1 - 12秒間 root - 4s cast - 2100 range",
            "Level 28 - Bola Shot 2 - 20秒間 root - 4s cast - 2100 range",
            "Level 38 - Bola Shot 3 - 28秒間 root - 4s cast - 2100 range",
            "Level 48 - Bola Shot 4 - 36秒間 root - 4s cast - 2100 range"],
     text "新しく snare shot が追加される。",
     ulist ["Level 45 - Patella Shot - 15秒間 melee hinder - 15s 再使用 - 4s cast - 2100 range"],
     text "Point Blank Shot は以下のようになる。Point Blank Shot はブロックされない。",
     ulist ["Level 16 - Point Blank Shot 1 - 74 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 12秒ごと、同時に 22% haste buff",
            "Level 26 - Point Blank Shot 2 - 134 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 10秒ごと、同時に 30% haste buff",
            "Level 36 - Point Blank Shot 3 - 195 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 8秒ごと、同時に 39% haste buff"],
     text "Poison shot は除去される。",
     text "Acid shot は射程が 1500 に減少し 350 半径 AoE になる。",
     br [] [],
     text "Siege Shot はダメージが増加する。",
     ulist ["Siege Shot 1 - ダメージ増加 2 から 7",
            "Seige Shot 2 - ダメージ増加 7 から 21",
            "Siege Shot 3 - ダメージ増加 15 から 42",
            "Siege Shot 4 - ダメージ増加 21 から 60",
            "Siege Shot 5 - ダメージ増加 26 から 75",
            "Siege Shot 6 - ダメージ増加 37 から 90",
            "Siege Shot 7 - ダメージ増加 42 から 105",
            "Siege Shot 8 - ダメージ増加 47 から 125"],
     text "Long Shot は cast speed debuff を持つ。",
     ulist ["Long Shot 1 - 3% cast speed debuff - 40秒間継続",
            "Long Shot 2 - 6% cast speed debuff - 40秒間継続",
            "Long Shot 3 - 9% cast speed debuff - 40秒間継続",
            "Long Shot 4 - 12% cast speed debuff - 40秒間継続",
            "Long Shot 5 - 15% cast speed debuff - 40秒間継続",
            "Long Shot 6 - 18% cast speed debuff - 40秒間継続",
            "Long Shot 7 - 21% cast speed debuff - 40秒間継続",
            "Long Shot 8 - 24% cast speed debuff - 40秒間継続"],
     text "新しいスペル Track が追加される。再使用30秒。ステルス中のみ詠唱可能。",
     ulist ["Level 20 - 15% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target",
            "Level 30 - 25% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target",
            "Level 40 - 35% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target",
            "Level 50 - 45% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target"],
     secmid "Beastcraft (スペック)",
     text "ペットが行う自己バフはプレイヤーが上書きできない。ペットの自己バフは25% buff effectiveness ボーナスで効果を計算される。",
     text "ペットは召喚時に自動で str/con buff および haste buff を行う。",
     text "Hunter's Avatar, Elder Protector, Elder Avatar ペットは Critical Strike スタイルを使用する。anytime snare と side stun の可能性がある。",
     text "Hunter's Protector ペット (level 20) もスタイルを使用する。",
     br [] [],
     text "ハンターのペットは unbreakable snare を詠唱する。",
     ulist ["Level 20 - Gleipnir's Wish - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間2秒 - 再使用90秒",
            "Level 35 - Gleipnir's Will - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間4秒 - 再使用90秒",
            "Level 50 - Gleipnir's Command - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間6秒 - 再使用90秒"],
     text "新しい呪文が追加される。",
     ulist ["Level 2 - Wolfen Frenzy - Instant cast - ペット対象 50% celerity buff, 25% damage done buff, -25% absorption debuff. 持続時間30秒, 再使用60秒",
            "ペットコマンド“Frenzy”は削除される。"],
     text "召喚ペットの再使用時間が変更される。",
     ulist ["Level 32 - Hunter's Avatar - 1分45秒",
            "Level 40 - Hunter's Elder Protector - 90秒",
            "Level 50 - Hunter's Elder Avatar - 60秒"],
     text "低レベルペットの再使用時間は2分のままである。",
     secmid "Sword (スペック)",
     ulist ["Level 15 - Aurora - Northern Lights - ダメージやや増加",
            "Level 29 - Rush - Side - 15秒 hinder",
            "Level 50 - Ragnarok - Rear - ダメージかなり増加"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "ハンター 1.121B"],
     text "Point Blank Shot の combat speed buff が変更される。",
     ulist ["Level 30 - Point Blank Shot 2 - Combat Speed 30% から 25% に変更",
            "Level 40 - Point Blank Shot 3 - Combat Speed 39% から 29% に変更"]]


patch_1_121C : List (Html Message)
patch_1_121C =
    [h2 [] [text "ハンター 1.121C"],
     text "Point Blank Shot の Pulsing Bladeturn 効果は除去される。自己ヘイストは元の値に戻される。",
     ulist ["Level 16 - 22% haste",
            "Level 28 - 30% haste",
            "Level 40 - 39% haste"],
     text "ハンターのペットは side stun を行わなくなる。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ハンター 1.122B"],
     secmid "Beastcraft (スペック)",
     text "Level 50 - Hunter's Elder Avatar - ペットのレベルは召喚者のレベルと同じになる。"]


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "ハンター Hot Fix Changes - 2/2/17"],
     secmid "Beastcraft (スペック)",
     text "レベル50ペット Hunter's Elder Avatar の被ダメージは15%減少する。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ハンター 1.123"],
     secmid "Archery (スペック)",
     text "クリティカルショットの endo コストは15%に増加する。",
     text "クリティカルショットのダメージは以下のように低下する。",
     ulist ["Level 35 - Critical Shot 6 - 190に低下(以前は204)",
            "Level 41 - Critical Shot 7 - 215に低下(以前は242)",
            "Level 47 - Critical Shot 8 - 250に低下(以前は285)",
            "Level 49 - Critical Shot 9 - 290に低下(以前は305)"],
     secmid "Beastcraft (スペック)",
     text "ペット召喚スペルの再使用時間は90秒になる。",
     text "Avatar の継続時間は5分になる。",
     text "armor wither スタイルはすべての Avatar から削除される。"]


patch_1_123C : List (Html Message)
patch_1_123C =
    [h2 [] [text "ハンター 1.123C"],
     secmid "Beastcraft (スペック)",
     text "Hunter's Avatar の背後スタンは完全に除去される。",
     br [] [],
     text "Hunter's Avatar が病気を proc する確率は以下のように低下する。",
     ulist ["Level 40 - 10%から7%へ",
            "Level 50 - 15%から10%へ"]]

    
patch_1_124 : List (Html Message)
patch_1_124 =
    [h2 [] [text "ハンター 1.124"],
     text "RR5アビリティー Entwining は削除され新しいアビリティー Bestial Heart に置き換えられる。",
     ulist ["Bestial Heart - Instant cast - 30秒継続 - 再使用10分 - Hunter's Avatar が必要。ペットが Dire Wolf に変化する。Dire Wolf では物理ダメージが15%増加し、攻撃速度(celerity)が40%増加し、すべての物理攻撃は病気を与えるようになる。Hunter はこの状態では弓を使うことができない。ただしこの能力はいつでもキャンセルできる。この能力を使うとステルス状態は解除される。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B ++ patch_1_121C ++ patch_1_122B
      ++ patch_20170202
      ++ patch_1_123
      ++ patch_1_123C
      ++ patch_1_124
