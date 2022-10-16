# 프로젝트명: Parawallet
### Relay chain부터 parachain까지 네이티브 토큰을 전송하고 체인간 자산이동도 가능한 크롬 익스텐션 지갑

## 0. 기존 폴카닷 생태계내 지갑들의 문제점 & 솔루션

- 문제점: 릴레이 체인과 파라체인 모두 커버하는 크롬 익스텐션 지갑이 없음(웹 지갑은 존재)
- 솔루션: relay chain인 POLKADOT/KUSAMA/ROCOCO(testnet)과 비교적 잘 알려진 파라체인인
  ASTAR/ACALA/ROCOCO-Contracts(testnet)에서 네이티브 토큰을 전송할 수 있는 크롬 익스텐션 지갑을 만들자.
- 추가 기능: XCM(Cross-Chain Message) 구현

## 1. 체인 소개
### (1) POLKADOT/KUSAMA/ROCOCO

- 위 체인들은 RELAY CHAIN으로서 파라체인들을 연결하는 중심 체인이자 LAYER 0 블록체인이다.
- POLKADOT은 시총 10위 근처에 해당하는 체인으로 빗썸에 상장되어있다.
- KUSAMA는 POLKADOT의 sister 또는 uncle 체인으로 불리며 polkadot보다 조금 더 실험적인 생태계로 구성되어있다.
  POLKADOT에 런칭하기 전 시장에 내놓아 마지막 테스트를 하는 체인이며 네이티브 토큰이 실제로 경제적 가치를 지니고 있다.
- KUSAMA의 시가 총액은 약 4천 8백억원(22.10.15 기준)
- ROCOCO는 LAYER 0 relay chain 테스트넷이다.

### (2) ASTAR

- 스마트컨트랙트 허브 및 플랫폼 역할을 하는 폴카닷 파라체인
- 최근 EVM contract와 WASM contract를 상호 운용가능하게 하는 대규모 Update를 준비하고 있다. (기술적으로 매우
  주목받는 체인 중 하나)
- 시가 총액은 약 1800억원(22.10.15 기준)

### (3) ACALA

- 폴카닷내 잘 알려져있는 디파이 프로토콜이자 파라체인이다.
- 폴카닷 파라체인은 독특하게도 dApp 하나만을 위한 Layer 1 블록체인(파라체인)을 build할 수 있다.
- 시가 총액은 약 1400억원(22.10.16 기준)

### (4) ROCOCO-Contracts

- ROCOCO relay chain에 연결된 파라체인이다.
- 스마트컨트랙트를 배포하여 테스트를 해볼 수 있는 테스트넷이다.

## 2. 위 체인들을 선택한 이유

### (1) 합의 알고리즘

- 폴카닷의 합의알고리듬은 NPoS(Nominated Proof of Staking)를 채택하고 있다.
- 지명 및 선출 시스템상 비교적 소수의 노드 참여자들이 블록 생성에 관여하여 TPS 또한 높은 편에 속한다.
- 그러면서도 동시에 여러 파라체인의 존재 및 지분증명과 일반 참여자도 지명을 통해 간접적으로 블록 생성에 관여하기 때문에 중앙화되었다고 말하기도 어렵다.

### (2) 멀티체인과 XCM

- 기본적으로 폴카닷은 하나의 Relay chain에 여러 개의 parachain이 연결된 구조로 탈중앙화되어있다. 예를 들어, 하나의 파라체인이 노드 생성이 멈추더라도 다른 체인에 영향을 주지 않는다.
- Cross chain message(XCM) relay chain과 parachain간 또는 parachain 사이의 자산 이동이 가능한 폴카닷의 주요 기술 feature
- 기존 Polkadot의 합의 알고리즘과 보안에 의해 보호되기 때문에 해킹 위험이 높은 브릿지보다 훨씬 안전하게 자산을 다른 체인으로 이동시킬
  수 있다.
- 브릿지는 특히나 많은 부분에서 보안상의 취약점이 있을 수 있어 해커들의 공격 대상이 되기도 하는데 폴카닷의 XCM은 안전하게 체인간 자산 이동이 가능하다는 점에서 매우 매력적인 체인이라고 할 수 있다.
  
## Tech stack

- Chrome extension(FE): ReactJS, Recoil
- RPC-communication: Polkadot-JS-API
- Javascript runtime: Deno(for api test)/Nodejs
