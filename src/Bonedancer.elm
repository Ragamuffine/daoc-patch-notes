module Bonedancer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ボーンダンサー 1.121"],
     text "ボーンダンサーはフルリスペックされる。",
     secmid "Bone Army (基本)",
     text "新しい level 40 Skeletal Commander が追加される。Charge 能力を持つ。他のすべての Skeletal Commander から Charge 能力は除去される。",
     secmid "Suppression (スペック)",
     text "fossil guardian が cast する Shards of Bone damage-shield buff は除去される。",
     br [] [],
     text "新しいペット fossil conjurer が追加される。levels 34 と 44 の spirit DD スペルで攻撃を行う。",
     br [] [],
     text "single-target ABS buff は除去される。",
     secmid "Bone Army (スペック)",
     text "level 40 の Bone Army archer commander は level 50 に変更になる。",
     ulist ["commander は Bone Army General と呼ばれ level 50 から見て黄色になる。",
            "commander は最大 4 ではなく 6 のペットをサポートできる。",
            "commander はペットにアシストさせることもアシストさせないこともできる。"],
     text "いくつかの能力のレベルが変更になる。",
     ulist ["Damage Add は level 50 から 48 になる。",
            "Fossil Warrior sub-pet は level 48 から 46 になる。",
            "Taunt は level 46 から 43 になる。",
            "Str/Con buff は level 43 から 40 になる。"],
     text "すべての Bone Army melee sub pet は Charge 能力を失う。",
     br [] [],
     text "endurance/power drain totem の効果は 10% power / 25% endurance から 20% power / 50% endurance に増加する。吸収量はターゲットの現在の power/endurance である。最大値ではない。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ボーンダンサー 1.122B"],
     text "ボーンダンサーはフルリスペックされる。",
     secmid "Darkness (スペック)",
     text "cold DD/snare 呪文は以下のように調整される。",
     ulist ["Level 1 - Stiffen Skeleton - 2.8s cast - 1500 range - 6 power - 24 cold damage and 5% snare.",
            "Level 11 - Solidify Skeleton - 2.8s cast - 1500 range - 14 power - 58 cold damage and 10% snare.",
            "Level 21 - Calcify Skeleton - 2.8s cast - 1500 range - 30 power - 112 cold damage and 15% snare.",
            "Level 31 - Ossify Skeleton - 2.8s cast - 1500 range - 46 power - 141 cold damage and 25% snare.",
            "Level 41 - Crystallize Skeleton - 2.8s cast - 1500 range - 55 power - 189 cold damage and 35% snare."],
     text "body debuff は以下のように調整される。",
     ulist ["Level 2 - Assist Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 5%",
            "Level 12 - Improve Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 10%",
            "Level 22 - Boost Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 15%",
            "Level 32 - Support Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 30%",
            "Level 42 - Bolster Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 50%"],
     text "新しい打ちっぱなし型のペットが追加される。これらのペットに攻撃されても妨害されない。",
     ulist ["Level 6 - Bone Phantoms - 2s cast - 1250 range - 15秒ごと - 15% power + 5/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 12 cold damage の攻撃を行いその後消滅する。同時に一体のみ。",
            "Level 16 - Bone Ghasts - 2s cast - 1250 range - 15秒ごと - 15% power + 15/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 25 cold damage の攻撃を行いその後消滅する。同時に一体のみ。",
            "Level 26 - Bone Spirits - 2s cast - 1250 range - 10秒ごと - 15% power + 30/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 90 cold damage の攻撃を行いその後消滅する。同時に一体のみ。",
            "Level 36 - Bone Haunts - 2s cast - 1250 range - 10秒ごと - 15% power + 50/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 175 cold damage の攻撃を行いその後消滅する。同時に二体まで。",
            "Level 46 - Bone Revenants - 2s cast - 1250 range - 5秒ごと - 15% power + 70/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 300 cold damage の攻撃を行いその後消滅する。同時に三体まで。"],
     text "direct damage totem は以下のように変更になる。",
     ulist ["Level 4 - Dusk Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに 35 cold damage",
            "Level 14 - Gloom Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに66 cold damage",
            "Level 24 - Murk Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに109 cold damage",
            "Level 34 - Shadow Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに162 cold damage",
            "Level 44 - Obsidian Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに 252 cold damage"],
     text "トーテム呪文は地面上のターゲットに設置する呪文である。すべてのトーテム呪文はタイマーを共有し、同時に一つのみ有効である。spell duration ボーナスは設置呪文には影響しない。",
     br [] [],
     text "新しい concentration 型トーテムが追加される。",
     ulist ["Level 50 - Sable Totem - Instant cast - 持続時間10秒 - 再使用5分 - 半径200 - 10% power - トーテムの範囲内にいる最大8人までの味方は呪文を妨害されない。"],
     text "commander pet 召喚呪文は以下のように名前も含めて変更される。",
     ulist ["Level 40 - Summon Dread Lich - 6s cast - 40% power - Dread Guardian を召喚する。"],
     text "Dread Lich は以下のように変更になる。",
     ulist ["このペットは常に code/snare DD を使うようになる。",
            "ダメージは脅威的なレベルまで増加する。",
            "単体 disease は除去される。",
            "単体 DD/debuff は除去される。",
            "スネアは 35% から 40% になる。",
            "召喚時に魔法ダメージ増加自己バフを詠唱する。"],
     secmid "Suppression (スペック)",
     text "新しく disarm の能力が追加される。",
     ulist ["Level 1 - Punish Combatant - Instant cast - 1500 range - 持続時間1秒 - 再使用1分 - 20% power - ターゲットは3秒間物理攻撃ができない",
            "Level 11 - Punish Assailant - Instant cast - 1500 range - 持続時間3秒 - 再使用1分 - 20% power - ターゲットは5秒間物理攻撃ができない",
            "Level 21 - Punish Aggressor - Instant cast - 1500 range - 持続時間5秒 - 再使用1分 - 20% power - ターゲットは7秒間物理攻撃ができない",
            "Level 31 - Punish Opponent - Instant cast - 1500 range - 持続時間7秒 - 再使用1分 - 20% power - ターゲットは9秒間物理攻撃ができない",
            "Level 41 - Punish Soldier - Instant cast - 1500 range - 持続時間9秒 - 再使用1分 - 20% power - ターゲットは11秒間物理攻撃ができない"],
     text "AoE スネア DD のスペルは以下のように変更になる。",
     ulist ["Level 3 - Shroud of Uncertainty - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 5 power - 8 body damage 10% snare.",
            "Level 13 - Shroud of Doubt - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 14 power - 44 body damage 20% snare.",
            "Level 23 - Shroud of Fear - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 25 power - 78 body damage 30% snare.",
            "Level 33 - Shroud of Despair - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 30 power - 95 body damage 40% snare.",
            "Level 43 - Shroud of Cowardice - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 39 power - 111 body damage 50% snare."],
     text "グループABSバフは以下のように変更になる。",
     ulist ["Level 5 - Harden Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +1.",
            "Level 15 - Toughen Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +2.",
            "Level 25 - Strengthen Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +3.",
            "Level 35 - Augment Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +6.",
            "Level 45 - Bolster Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +9."],
     text "snare トーテムは slow トーテムに変更される。",
     ulist ["Level 7 - Slowing Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 20 power - 範囲内の敵を最大8体まで2秒間 10% slow",
            "Level 17 - Crawling Ground - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 30 power - 範囲内の敵を最大8体まで2秒間 20% slow",
            "Level 27 - Bone Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 45 power - 範囲内の敵を最大8体まで2秒間 40% slow",
            "Level 37 - Hindering Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 62 power - 範囲内の敵を最大8体まで2秒間 55% slow",
            "Level 47 - Grasping Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 75 power - 範囲内の敵を最大8体まで2秒間 75% slow"],
     text "トーテム呪文は設置型である。",
     text "すべてのトーテム呪文はタイマーを共有し、同時に一つのみ有効である。呪文持続時間延長ボーナスは設置型呪文には無効である。",
     br [] [],
     text "単体ライフタップ呪文は以下のように調整される。",
     ulist ["Level 9 - Crush Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 27 body damage ダメージの80%吸収",
            "Level 19 - Crunch Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 58 body damage ダメージの80%吸収",
            "Level 29 - Powder Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 77 body damage ダメージの80%吸収",
            "Level 39 - Disintegrate Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 97 body damage ダメージの80%吸収",
            "Level 49 - Pulverize Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 123 body damage ダメージの80%吸収"],
     text "新しく物理ダメージ吸収トーテムが追加される。",
     ulist ["Level 50 - Protection Totem - Instant Cast - 持続時間15秒 - 再使用5分 - 250 radius - 10% power - 味方最大8体まで 350 ポイントの melee ablative を連続的に付与する。"],
     text "コマンダーペットの名前は変更される。",
     ulist ["Level 40 - Summon Dread Guardian - 詠唱6秒 - 40% power - Dread Guardian を召喚する。召喚時にHP再生自己バフを詠唱する。単体ライフタップは除去され spirit DD が追加される。spirit DD は同時に 40% spirit regist デバフを行う。power 再生バフは削除される。召喚時に ABS と AF の自己バフを詠唱する。他のグループメンバーをヒールできるが passive 状態でなければならない。そうでなければ敵を攻撃する。常にスタッフを装備している。"],
     secmid "Bone Army (基本)",
     text "コマンダーは以下のように調整される。",
     ulist ["Level 1 - Summon Bone Boss- 詠唱6秒 - 20% power - 合計レベル3のサブペットを支配できるコマンダーを召喚する。",
            "Level 6 - Summon Bone Squire - 詠唱6秒 - 20% power - 合計レベル15のサブペットを支配できるコマンダーを召喚する。",
            "Level 11 - Summon Bone Chieftain - 詠唱6秒 - 20% power - 合計レベル50のサブペットを支配できるコマンダーを召喚する。",
            "Level 16 - Summon Bone Squire Cadet - 詠唱6秒 - 20% power - 合計レベル75のサブペットを支配できるコマンダーを召喚する。",
            "Level 21 - Summon Bone Commander - 詠唱6秒 - 20% power - 合計レベル100のサブペットを支配できるコマンダーを召喚する。",
            "Level 31 - Summon Bone Master - 詠唱6秒 - 20% power - 合計レベル150のサブペットを支配できるコマンダーを召喚する。",
            "Level 41 - Summon Bone Captain - 詠唱6秒 - 20% power - 合計レベル100のサブペットを支配できるコマンダーを召喚する。",
            "Level 50 - Summon Commander - 詠唱6秒 - 20% power - 合計レベル150のサブペットを支配できるコマンダーを召喚する。"],
     text "サブペットのレベルは常にマスターの82%となる。レベルによってはコマンダーは1体または2体までのサブペットしか召喚できない。40以上のレベルではコマンダーは最大3体のサブペットを召喚できる。",
     br [] [],
     text "より強力なペットに対応するため、単体ペット demezz はレベル27に移動する。",
     br [] [],
     text "単体ペットヒールは以下のように調整される。",
     ulist ["Level 5 - Iron Bones - 詠唱3秒 - 2000 range - 4 power - 46回復",
            "Level 15 - Thicken Bones - 詠唱3秒 - 2000 range - 4 power - 81回復",
            "Level 25 - Develop Bones - 詠唱3秒 - 2000 range - 4 power - 146回復",
            "Level 35 - Restore Bones - 詠唱3秒 - 2000 range - 4 power - 201回復",
            "Level 45 - Inure Bones - 詠唱3秒 - 2000 range - 4 power - 300回復"],
     secmid "Bone Army (スペック)",
     text "Bone Army はボーンダンサーのすべてのサブペットが含まれている。サブペットのレベルは常にマスターのレベルの82%となる。つまりレベル1の Bone Defender はレベル50のプレイヤーから見て青となる。Bone Army のスペックには影響されない。",
     br [] [],
     text "新しいサブペットが追加される。これらのサブペットは以前は Darkness, Suppression, Bone Army スペックに属していた。",
     ulist ["Level 1 - Summon Bone Defender - 詠唱6秒 - 35% power - fossil defender を召喚する。物理的な力は弱いがダメージ吸収に特化している。移動速度は遅い。",
            "Level 5 - Summon Bone Guardian - 詠唱6秒 - 35% power - fossil guardian を召喚する。自己および仲間のサブペットを強化する。ヘイストバフは15% celerity バフになる。常にスタッフを装備する。",
            "Level 11 - Summon Bone Deadeye - 詠唱6秒 - 35% power - fossil archer を召喚する。弓を使って遠距離攻撃を行う。",
            "Level 15 - Summon Bone Mender - 詠唱6秒 - 35% power - fossil healer を召喚する。自己および仲間のサブペットをヒールする。これらのペットはボーンダンサーのHPが90%になるとヒールを行う。ヒール量は増加している。ヘルス regen バフは修正されている。3秒ごとに 75 の回復を行う。",
            "Level 21 - Summon Bone Spellbinder - fossil conjuror を召喚する。spirit 属性の魔法攻撃を行う。",
            "Level 25 - Summon Bone Soldier - 詠唱6秒 - 35% power - fossil solider を召喚する。強力な両手物理攻撃を行うが魔法攻撃には弱い。",
            "Level 30 - Summon Bone Hexer - fossil seer を召喚する。敵を弱体化させる魔法を使う。病気のみを詠唱し指示されない限り物理攻撃は行わない。",
            "Level 35 - Summon Bone Warmage - fossil mystic を召喚する。slow 効果を持つ cold DD で攻撃する。"],
     text "新しいコマンダーが追加される。",
     ulist ["Level 40 - Summon Dread Guardian - 詠唱6秒 - 40% power - Dread Guardian を召喚する。召喚時に自己ヘルス regen バフを詠唱する。このバフはリリース時に除去される。spirit DD で敵を攻撃する。この DD には 40% レジストデバフの効果がある。単体ライフ吸収は削除されている。パワー回復バフは削除されている。召喚時に ABS バフと AF バフを詠唱する。グループメンバーをヒールするが passive 状態にしておく必要がある。このペットは敵への攻撃を優先する。常にスタッフを装備する。",
            "Level 45 - Summon Dread Lich - 詠唱6秒 - 40% power - Dread Lich を召喚する。このペットは常にスネア cold DD で攻撃するようになる。ダメージは脅威となるように増加している。単体病気は削除されている。単体デバフ DD は削除された。スネア効果は 35% から 40% に増加している。召喚時に魔法ダメージ強化自己バフを詠唱する。",
            "Level 50 - Summon Dread Lord - 詠唱6秒 - 65% power - このペットはレベル52であり最大5体のサブペットを保有できる。このペットは Mastery of Concentration 中の敵を一定確率で妨害できる。配下のサブペットに分散、アシストを指示できる。魔法ダメージに耐性を持つ。召喚時にフルバフされている。"],
     text "AoE DoT 呪文が追加された。",
     ulist ["Level 2 - Liquify Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 18 power -12 body damage.",
            "Level 12 - Render Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 30 power - 30 body damage.",
            "Level 22 - Soften Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 42 power - 60 body damage.",
            "Level 32 - Fade Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 3秒ごと - 50 power - 88 body damage.",
            "Level 42 - Ruin Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 2.5秒ごと - 64 power - 131 body damage."],
     text "インスタント単体 DD 呪文が追加された。",
     ulist ["Level 8 - Familiar Dart - 3 body damage - 1250 range - 再使用15秒 - 20% power",
            "Level 18 - Familiar Jolt - 18 body damage - 1250 range - 再使用15秒 - 20% power",
            "Level 28 - Familiar Blast - 42 body damage - 1250 range - 再使用15秒 - 20% power",
            "Level 38 - Familiar Burst - 62 body damage - 1250 range - 再使用15秒 - 20% power",
            "Level 48 - Familiar Defeat - 86 body damage - 1250 range - 再使用15秒 - 20% power"]]


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h2 [] [text "ボーンダンサー 1.122B Hot Fix"],
     text "トーテムは以下のように変更になる。出現するトーテムは一本のみであるが半径内に効果がある。トーテムの効果は詠唱後すぐに有効になりその後は通常どおりパルスが続く。"]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "ボーンダンサー 1.122B Hot Fix #2"],
     text "ドレッドロードの魔法抵抗はやや減少する。",
     text "fossil healer の回復量はやや減少する。",
     text "すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。"]


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "ボーンダンサー Hot Fix Changes - 2/2/17"],
     secmid "Suppression (スペック)",
     text "disarm は次のように変更される。",
     ulist ["Level 1 - Punish Combatant - 再使用5分になる。",
            "Level 11 - Punish Assailant - 持続時間2秒、再使用5分になる。",
            "Level 21 - Punish Aggressor - 持続時間4秒、再使用3分になる。",
            "他は変更されない。"],
     secmid "Bone Army (スペック)",
     text "サブペットは以下のように変更される。",
     ulist ["Fossil Defender - 移動速度が普通になる。体力が15%増加する。",
            "Fossil Guardian - すべてのダメージを10%防御する。体力が5%増加する。スタッフスタイルを使用する。(Fossil Jump - Any - 対象のAFを10秒間50低下させる。)グループ対象バフを行う。(Fossil Strength - 対象のSTRを50増加させる。)",
            "Fossil Healer - ヒールの詠唱時間が0.2秒増加する。非ダメージが50%増加する。",
            "Fossil Soldier - ダメージ全体が10%低下する。もはや二重攻撃を行わない。敵からの物理攻撃を吸収しない。スタイルが変更される。Fossil Cleave は攻撃速度デバフを行わない。Glacial Movement は側面からスネア19秒。Raider はイベイド20秒間4秒毎に20ダメージ。背後スタイル、スタンスタイルはなくなった。",
            "Fossil Seer - 病気の詠唱時間が0.5秒増加する。",
            "Fossil Mystic - スネアDDのダメージが10%低下する。通常DDのダメージは5%低下する。"]]


patch_1_122C : List (Html Message)
patch_1_122C =
    [h2 [] [text "ボーンダンサー 1.122C"],
     secmid "Suppression (スペック)",
     text "Grasping Totem の系列はすべて slow ではなく snare になる。",
     secmid "Bone Army (スペック)",
     text "Dread Lord はスタンをしなくなる。",
     text "Fossil Mystic, Fossil Healer, Fossil Conjurer, Fossil Seer が妨害を受けない確率は75%から25%に減少する。"]


patch_1_122C_HotFixNotes : List (Html Message)
patch_1_122C_HotFixNotes =
    [h2 [] [text "ボーンダンサー The Ghost Keep RvR Event and Hot Fix Notes"],
     secmid "Darkness (スペック)",
     text "Bone Revenant にある召喚ファンタズムはもはやステルス中の敵を攻撃・暴露しない。",
     secmid "Suppression (スペック)",
     text "disarm は fumble に変更される。",
     ulist ["Level 1 - Punish Combatant - 1500 range - Instant cast - 持続時間3秒 - 再使用5分 - 20% power - fumble 3%",
            "Level 11 - Punish Assailant - 1500 range - Instant cast - 持続時間6秒 - 再使用5分 - 20% power - fumble 5%",
            "Level 21 - Punish Aggressor - 1500 range - Instant cast - 持続時間8秒 - 再使用3分 - 20% power - fumble 10%",
            "Level 31 - Punish Opponent - 1500 range - Instant cast - 持続時間12秒 - 再使用60秒 - 20% power - fumble 20%",
            "Level 41 - Punish Soldier - 1500 range - Instant cast - 持続時間15秒 - 再使用60秒 - 20% power - fumble 30%"],
     secmid "Bone Army (スペック)",
     text "Level 42 Ruin Bones の tick ごとのダメージは 131 から 121 に減少する。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix
      ++ patch_1_122B_HotFix2 ++ patch_20170202
      ++ patch_1_122C
      ++ patch_1_122C_HotFixNotes
