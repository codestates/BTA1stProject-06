# Parawallet
## 기존 폴카닷 생태계내 지갑들의 문제점 & 솔루션
- 문제점: 릴레이 체인과 파라체인 모두 커버하는 크롬 익스텐션 지갑이 없음(웹 지갑은 존재)
- 솔루션: relay chain인 POLKADOT/KUSAMA/ROCOCO(testnet)과 비교적 잘 알려진 파라체인인 ASTAR/SHIDEN/SHIBUYA(testnet)/PARALLEL/INTERLAY에서 네이티브 토큰을 전송할 수 있는 크롬 익스텐션 지갑을 만들자.

## POLKADOT/KUSAMA/ROCOCO
- RELAY CHAIN으로서 파라체인을 연결하는 중심 체인이다. LAYER 0 블록체인이다.
- POLKADOT은 시총 10위 근처에 해당하는 체인으로 빗썸에 상장되어있다.
- KUSAMA는 POLKADOT의 sister 또는 uncle 체인으로 불리며 polkadot보다 조금 더 실험적인 생태계로 구성되어있다. 폴카닷에 런칭하기 전 마지막 실전 테스트를 하는 체인으로 생각하면 된다.
- ROCOCO는 LAYER 0 relay chain 테스트넷이다.

## ASTAR/SHIDEN/SHIBUYA
- 스마트컨트랙트 허브 및 플랫폼 역할을 하는 폴카닷 파라체인
- 최근 EVM contract와 WASM contract를 상호 운용가능하게 하는 대규모 Update를 준비하고 있음(기술적으로 되게 주목받는 체인이다)
- SHIDEN은 역시나 ASTAR의 sister chain이며 SHIBUYA는 테스트넷이다.

## ACALA/PARALLEL/INTERLAY
- Polkadot 생태계내 비교적 잘 알려진 Defi 프로토콜 파라체인이다.
- 참고로 폴카닷에서는 하나의 프로토콜을 위해 파라체인을 만들어 런칭할 수 있다.
- 즉 이것들은 dApp이면서 동시에 Layer 1 체인이기도 하다.

## For development
1. [Scanner link](https://astar.subscan.io/extrinsic/)
2. RPC endpoint: wss://astar-rpc.dwellir.com:443
