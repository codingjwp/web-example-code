# Zustand Example

**Zustand 란**

작고 빠르며 확장이 가능한 베어본 상태 관리 솔루션

후크 기반의 API와 보일러플레이트 또는 독단적이지 않고 명시적, 유동적일 정도의 규칙가지고 있습니다.

## 핵심 원칙

- **간단한 Flux 원칙** : Flux는 MVC패턴을 보완하는 프론트엔드 디자인 패턴
- **훅기반의 편리한 API** : React의 훅을 기반으로하는 API
- **렌더링 없는 상태 변환 감지** : 렌더링을 발생시키지 않고 컴포넌트에 상태 변화를 알림
- **의견이 없는 설계** : 특정한 방식이나 패턴을 강제하지 않는 설계

## 설치 방법

```bash
# npm
npm i zustand
# yarn
yarn add zustand
```

## 권장 패턴

- Zustand를 사용하여 애플리케이션의 전역 상태를 관리할 때, 전역 상태는 하나의 Zustand 스토어에 위치해야 합니다.  
- 큰 애플리케이션에서는 상태 관리가 복잡해질 수 있습니다. Zustand는 이를 해결하기 위해 스토어를 "슬라이스(slice)"라는 여러 부분으로 나누는 기능을 제공합니다.

### set / setState를 사용하여 업데이트

set 또는 setState를 사용하여 스토어(Store)을 업데이트하세요.

### 스토어 액션(Store actions)

zustand에서는 다른 Flex 라이브러이에 볼수 있는 dispatcher와 reducers를 사용하지 않고 상태를 업데이트 할 수 있습니다.

```javascript
const useBoundStore = create((set) => ({
  storeSliceA: ...,
  storeSliceB: ...,
  storeSliceC: ...,
  updateX: () => set(...),
  updateY: () => set(...),
}))
```

값을 엑세스 할때 사용법 입니다.

```javascript
const storeSliceA =  useBoundStore((state) => state.storeSliceA);
```

## Auto Generating Selectors 

### `createSelectors`

좀 더 확인 후 지정

## 권장 되는 사용법

작업(Action)과 상태(State)를 저장소 내에서 같은 위치에 배치하는 것 입니다.

### 데이터와 작업이 함께 포함된 저장소

```javascript
export const useBoundStore = create((set) => ({
  count: 0,
  text: 'hello',
  inc: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text }),
}))
```

### 스토어 외부의 모듈 수준에서 작업을 정의하는 것입니다.

- 액션을 호출하는 데 후크가 필요하지 않습니다;
- 코드 분할이 용이합니다.

```javascript
export const useBoundStore = create(() => ({
  count: 0,
  text: 'hello',
}))

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })
```

## 타입스크립트 가이드

`create<T>()(...)`로 타입 후 괄호를 작성해야합니다.

```typescript
import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```


# 프론트엔드 디자인 패턴

## MVC

## Flux

애플리케이션에서 **단반향 데이터 흐름**을 관리하기 위한 패턴

## 부품(Parts)

- **Dispatcher**
- **Store**
- **Action**
- **View**

### Dispatcher

디스패처(Dispatcher)는 작업(Action)을 수신하여 디스패처(Dispatcher)에 등록한 스토어(Store)에 작업을 발송합니다.  
모든 스토어(Store)가 모든 작업(Action)을 수신합니다.  
각 애플리케이션에 하나의 싱글톤 디스패처만 있어야합니다.  

### Store

애플리케이션의 데이터를 보관하는 곳입니다.  
디스패처(Dispatcher)에 등록되어 액션(Action)을 수신할 수 있습니다.  
스토어의 데이터는 액션(Action)에 응답해야만 변경이 가능합니다.  
public setter이 없어야 하며 getter만 있어야 합니다.  


### Action

애플리케이션 내부 API를 정의합니다.  
애플리케이션과 상호작용할 수 있는 모든 방식을 캡쳐합니다.
일부 데이터가 있는 간단한 객체와 타입 필드입니다.  

액션은 의미론적으로 수행되는 액션을 설명해야 합니다.
프로세스가 작동하는 방식에 관계없이 해야합니다.("delete-user-id", "clear-user-data", "refresh-credentials") -> ("delete-user")

### View

뷰는 상태를 가져와서 보여주고 사용자로 부터 입력 받을 화면을 보여줍니다

## 데이터 흐름(Flow of data)

- 뷰는 작업을 디스패처로 보냅니다.
- 디스패처는 모든 스토어에 작업을 보냅니다.
- 스토어는 뷰에 데이터를 보냅니다. (다른 표현: 뷰는 스토어에서 데이터를 가져옵니다)

<img width="400" height="300" src="https://github.com/facebookarchive/flux/blob/main/examples/flux-concepts/flux-simple-f8-diagram-with-client-action-1300w.png" alt="flow-of-flux-data" />

