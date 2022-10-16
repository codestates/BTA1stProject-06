# Parawallet

## 기존 폴카닷 생태계내 지갑들의 문제점 & 솔루션

- 문제점: 릴레이 체인과 파라체인 모두 커버하는 크롬 익스텐션 지갑이 없음(웹 지갑은 존재)
- 솔루션: relay chain인 POLKADOT/KUSAMA/ROCOCO(testnet)과 비교적 잘 알려진 파라체인인
  ASTAR/ACALA/ROCOCO-Contracts(testnet)에서 네이티브 토큰을 전송할 수 있는 크롬 익스텐션 지갑을 만들자.
- 추가 기능: XCM(Cross-Chain Message) 구현

## POLKADOT/KUSAMA/ROCOCO

- 위 체인들은 RELAY CHAIN으로서 파라체인들을 연결하는 중심 체인이자 LAYER 0 블록체인이다.
- POLKADOT은 시총 10위 근처에 해당하는 체인으로 빗썸에 상장되어있다.
- KUSAMA는 POLKADOT의 sister 또는 uncle 체인으로 불리며 polkadot보다 조금 더 실험적인 생태계로 구성되어있다.
  POLKADOT에 런칭하기 전 시장에 내놓아 마지막 테스트를 하는 체인이며 네이티브 토큰이 실제로 경제적 가치를 지니고 있다.
- KUSAMA의 시가 총액은 약 4천 8백억원(22.10.15 기준)
- ROCOCO는 LAYER 0 relay chain 테스트넷이다.

## ASTAR

- 스마트컨트랙트 허브 및 플랫폼 역할을 하는 폴카닷 파라체인
- 최근 EVM contract와 WASM contract를 상호 운용가능하게 하는 대규모 Update를 준비하고 있다. (기술적으로 매우
  주목받는 체인 중 하나)
- 시가 총액은 약 1800억원(22.10.15 기준)

## ACALA

- 폴카닷내 잘 알려져있는 디파이 프로토콜이자 파라체인이다.
- 폴카닷 파라체인은 독특하게도 dApp 하나만을 위한 Layer 1 블록체인(파라체인)을 build할 수 있다.
- 시가 총액은 약 1400억원(22.10.16 기준)

## ROCOCO-Contracts

- ROCOCO relay chain에 연결된 파라체인이다.
- 스마트컨트랙트를 배포하여 테스트를 해볼 수 있는 테스트넷이다.

## XCM

- Cross chain message로 relay chain과 parachain간 또는 parachain 사이의 자산 이동이 가능하다.
- 기존 Polkadot의 합의 알고리즘과 보안에 의해 보호되기 때문에 해킹 위험이 높은 브릿지보다 훨씬 안전하게 자산을 다른 체인으로 이동시킬
  수 있다.

## Tech stack

- Chrome extension(FE): ReactJS, Recoil
- RPC-communication: Polkadot-js
- Test: deno
