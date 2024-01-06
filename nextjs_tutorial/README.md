# Next.js 튜토리얼

- **최적화** : 이미지, 링크, 글꼴을 최적화하는 방법.
- **라우팅** : 파일 시스템 라우팅을 사용하여 중첩된 레이아웃과 페이지를 만드는 방법입니다.
- **데이터 가져오기** : Vercel에서 데이터베이스를 설정하는 방법과 가져오기 및 스트리밍 모범 사례입니다.
- **검색 및 페이지 매김** : URL 검색 매개변수를 사용하여 검색 및 페이지 매김을 구현하는 방법입니다.
- **데이터 변경** : React Server Actions를 사용하여 데이터를 변경하고 Next.js 캐시를 재검증하는 방법.
- **오류 처리** : 404 일반적인 오류와 찾을 수 없는 오류를 처리하는 방법입니다 .
- **양식 유효성 검사 및 접근성** : 서버 측 양식 유효성 검사를 수행하는 방법과 접근성 향상을 위한 팁입니다.
- **인증** : 다음을 사용하여 애플리케이션에 인증을 추가하는 방법NextAuth.js그리고 미들웨어.
- **메타데이터** : 메타데이터를 추가하고 소셜 공유를 위해 애플리케이션을 준비하는 방법입니다.


## Next.js에서 Font와 Image 추가 및 최적화

**Font 최적화 방식**

Next.js는 빌드 시점에 글꼴 파일을 다운로드하여 다른 정적 에셋과 함께 호스팅합니다.  
즉, 사용자가 애플리케이션을 방문할 때 성능에 영향을 줄 수 있는 글꼴에 대한 추가 네트워크 요청이 발생하지 않습니다.

`antialiased` 글꼴을 부드럽게 만드는 클래스

**이미지 최적화**

- [이미지 최적화 문서](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [글꼴 최적화 문서](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [이미지를 통한 웹 성능 향상(MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [웹 글꼴(MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)

## 중첩 라우팅

Next.js는 폴더가 중첩된 경로를 만드는 데 사용되는 파일 시스템 라우팅을 사용합니다.  
각 폴더는 URL 세그먼트 에 매핑되는 경로 세그먼트를 나타냅니다.

ex) test.com/dashboard/invoices

📁 app  
┗ 📁 dashboard  
&ensp;┗ 📁 invoices

### 부분 렌더링

Next.js에서 레이아웃을 사용하면 탐색 시 페이지 컴포넌트만 업데이트되고  
레이아웃은 다시 렌더링되지 않는다는 이점이 있습니다. **이를 부분 렌더링이라고 합니다.**

### 레이아웃의 목적

여러가지 페이지 UI를 공유로 사용할 수 있는 레이아웃

## 페이지간의 탐색 부분

### 자동 코드 분할 및 프리패치
탐색 환경을 개선하기 위해 Next.js는 경로 세그먼트별로 애플리케이션을 자동으로 코드 분할합니다. 이는 브라우저가 초기 로드 시 모든 애플리케이션 코드를 로드하는 기존 React SPA와는 다릅니다.

경로별로 코드를 분할한다는 것은 페이지가 격리된다는 것을 의미합니다. 특정 페이지에서 오류가 발생해도 나머지 애플리케이션은 계속 작동합니다.

또한 프로덕션 환경에서 `<Link>` 컴포넌트가 브라우저의 뷰포트에 표시될 때마다 Next.js는 백그라운드에서 링크된 경로에 대한 코드를 자동으로 프리페치합니다.

사용자가 링크를 클릭할 때쯤이면 목적지 페이지의 코드가 이미 백그라운드에서 로드되어 있으므로 페이지 전환이 거의 즉각적으로 이루어집니다!

- [React SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)
- [Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)


## 데이터를 가져오는 방법 선택

### API 계층

- API를 제공하는 타사 서비스를 사용하는 경우.
- 클라이언트에 데이터를 가져오는 경우 데이터베이스 비밀을이 클라이언트에 노출되는 것을 방지하기 위해 서버에서 실행되는 API 계층 필요합니다.

Next.js에서는 [Router Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)로 API 엔드 포인트를 생성할 수 있습니다.

### 데이터베이스 쿼리

풀스택 애플리케이션을 만들 때는 데이터베이스와 상호 작용하는 로직도 작성해야 합니다. Postgres와 같은 관계형 데이터베이스의 경우 SQL 또는 Prisma와 같은 ORM을 사용하여 이 작업을 수행할 수 있습니다.

- API 엔드포인트를 생성할 때 데이터베이스와 상호 작용하는 논리를 작성해야 합니다.
- [React Server Compnents](#react-server-compnents-사용하여-데이터-가져오기)를 사용하는 경우 API 계층을 건너띄고 데이터베이스 비밀이 클라이언트에 노출된 위험 없이 데이터베이스를 직접 쿼리할 수 있습니다.


## React Server Compnents 사용하여 데이터 가져오기

**몇가지 이점들**

- `promises`를 지원하여 데이터 가져오기와 같은 비동기 작업을 위한 간단한 솔루션을 제공 하며 `useEffect`, `useState` 또는 데이터 불러오기 라이브러리를 사용하지 않고도 `async/await` 구문을 사용할 수 있습니다.
- `React Server Compnents`는 서버에서 실행되므로 비용이 많이 드는 데이터 가져오기 및 논리를 서버에 보관하고 결과만 클라이언트로 보낼 수 있습니다.
- 별도의 API 계층없이 데이터베이스에 직접 쿼리할 수 있습니다.

[SQL injections](https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections)


## request waterfalls?

**"워터폴(waterfalls)"**은 이전 요청의 완료 여부에 따라 달라지는 일련의 네트워크 요청을 의미합니다.

데이터 가져오기의 경우, 각 요청은 이전 요청이 데이터를 반환한 후에만 시작할 수 있습니다.

### 병렬 데이터 가져오기 

- `Promise.all()`또는`Promise.allSettled()`

```javascript
const data = await Promise.all([
  invoiceCountPromise,
  customerCountPromise,
  invoiceStatusPromise,
]);
```

- 모든 데이터 가져오기 실행을 동시에 시작하면 성능이 향상될 수 있습니다.
- 모든 라이브러리나 프레임워크에 적용할 수 있는 기본 JavaScript 패턴을 사용하세요.

**그러나 이 JavaScript 패턴에만 의존하면 한 가지 단점이 있습니다 . 하나의 데이터 요청이 다른 모든 데이터 요청보다 느리면 어떻게 될까요?**

### 느린 데이터 가져오기

동적 렌더링을 사용하면 애플리케이션의 속도가 가장 느린 데이터 가져오기 속도만큼만 빨라집니다.

- [정적 및 동적 렌더링](#정적-및-동적-렌더링)
- [Streaming(스트리밍)](#streaming스트리밍)

## 정적 및 동적 렌더링

### 정적 렌더링

정적 렌더링을 사용하면 빌드 시(배포 시) 또는 재검증 중에 데이터 가져오기 및 렌더링이 서버에서 발생 합니다.

사용자가 애플리케이션 방문할 때마다 캐시된 결과를 제공합니다.  

**정적 렌더링 이점**
- 더 빠른 웹사이트 : 캐시로 인한 이점
- 서버 로드 감소 : 캐시로 인한 이점
- SEO : 페이지가 로드될 때 이미 콘텐츠를 사용할 수 있어 검색 엔진 크롤러가 색인 생성하기 더 쉽습니다.

**정적 렌더링**은 정적 블로그 게시물이나 제품 페이지와 같이 데이터가 없거나 사용자 간에 공유되는 데이터가 없는 UI에 유용합니다.

정기적으로 업데이트되는 개인화된 데이터가 있는 대시보드에는 적합하지 않을 수 있습니다.

### 동적 렌더링

동적 렌더링을 사용할 경우 요청 시(사용자가 페이지를 방문할 때) 각 사용자의 콘텐츠가 서버에 렌더링 됩니다.

**동적 렌더링**
- 실시간 데이터 : 데이터가 자주 변경하는 애플리케이션에 이상적 입니다.
- 사용자별 콘텐츠 : 대시보드나 사용자 프로필과 같은 개인화된 콘텐츠를 제공하고 사용자 상호 작용을 기반으로 데이터를 업데이트하는 것이 더 쉽습니다.
- 요청 시간 정보 : 쿠키나 URL 검색 매개변수와 같이 요청 시간에만 알 수 있는 정보에 액세스할 수 있습니다.


> **별도 참고: unstable_noStore 실험적인 API이며 향후 변경될 수 있습니다. 자신의 프로젝트에서 안정적인 API를 사용하려는 경우 세그먼트 구성 옵션을 export const dynamic = "force-dynamic" 사용할 수도 있습니다 .**

## Streaming(스트리밍)

> **Streaming을 보고 느낀점**  
> 뭉쳐있는 비동기 API 통신들을 컴포넌트 별로 나누어 개별적으로 화면에 표시되도록 하고   
> 오래 걸리는 컴포넌트를 UX적으로 `loading` 중을 알리는 스켈레톤을 이용한 방법

**Streaming이란** 경로를 더 작은 청크로 나누고 서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술

**Streaming**을 사용하면 느린 데이터 요청으로 인해 전체 페이지가 차단되는 것을 방지할 수 있습니다.

이를 통해 사용자는 모든 데이터가 로드될 때까지 기다리지 않고도 페이지의 일부를 보고 상호 작용할 수 있습니다.

### Next.js에서 스트리밍을 구현하는 방법에는 두 가지가 있습니다.

- 페이지 수준에서 `loading.tsx`파일을 사용합니다.
- 특정 구성 요소의 경우 `<Suspense>`와 함께 사용합니다.

### 로딩 스켈레톤(skeletons) 추가

로딩 스켈레톤은 UI의 단순화된 버전입니다.  
많은 웹사이트에서 콘텐츠가 로드 중임을 사용자에게 알리기 위한 `placeholder`(또는 `fallback`)로 사용합니다.

`loading.tsx`에 임베드하는 모든 UI는 정적 파일의 **일부로 임베드되어 먼저 전송됩니다.** 그런 다음 나머지 동적 콘텐츠가 서버에서 클라이언트로 스트리밍됩니다.

### Next.js 라우터 그룹에서 로딩 스켈레톤 문제

경로에 영향을 받지 않고 그룹을 나누고 싶을때 **(그룹이름)** 로 폴더 작성

📁 app  
📁 dashboard  
&ensp;┗ 📁 (overview)  
&ensp;&ensp;┗ 📄 loading.tsx  
&ensp;&ensp;┗ 📄 page.tsx

- [Router Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

### 구성요소 Streaming

`<Suspense></Suspense>`에서 동적 구성요소를 래핑할 수 있습니다.

그런 다음 동적 구성요소가 로드되는 동안 표시할 대체 구성요소를 전달합니다.

### Suspense 경계를 어디에 배치할지 결정하는 법

**Suspense 어디에 설정할 지 확인하는 요소 들**

- 사용자가 페이지가 스트리밍되는 동안 어떤 경험을 하길 원하는지.
- 우선순위를 지정할 콘텐츠.
- 구성 요소가 데이터 가져오기에 의존하는 경우.

`loading.tsx`에서 했던 것처럼 전체 페이지를 스트리밍할 수도 있지만, 구성 요소 중 하나에 데이터 가져오기가 느린 경우 로딩 시간이 더 길어질 수 있습니다.

모든 컴포넌트를 개별적으로 스트리밍할 수도 있지만, 이 경우 준비가 완료될 때 화면에 UI가 튀어나올 수 있습니다.

페이지 섹션을 스트리밍하여 시차를 두는 효과를 만들 수도 있지만 이 경우에는 `wrapper` 컴포넌트를 만들어야 합니다.

## 부분 사전 렌더링(Partial Prerendering)

> Next.js 14버전에서 실험적인 기능이며 이 부분은 선택 사항입니다.

현재 경로 내에서 동적 함수(예: `noStore()`, `cookies()` 등)를 호출하면 전체 경로가 동적이 됩니다.

이는 오늘날 대부분의 웹 앱이 구축되는 방식과 일치하며, 전체 애플리케이션 또는 특정 경로에 대해 정적 렌더링과 동적 렌더링 중 하나를 선택합니다.

그러나 대부분의 경로는 완전히 정적이거나 동적이지 않습니다.  
정적 콘텐츠와 동적 콘텐츠가 모두 포함된 경로가 있을 수 있습니다.  

**Ex)**  

소셜 미디어 피드가 있고 게시물은 정적이지만 게시물에 대한 좋아요는 동적이라고 가정해 보겠습니다.

또는 제품 세부 정보는 정적이지만 사용자의 장바구니는 동적인 전자 상거래 사이트가 있다고 가정해 보겠습니다.


**부분 사전 렌더링** 은 정적 로딩 셸을 사용하여 경로를 렌더링하면서 일부 부분을 동적으로 유지할 수 있는 실험적 기능입니다.  
즉, **경로의 동적 부분을 분리**할 수 있습니다


![부분 사전 렌더링 모습을 나타낸 이미지](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fthinking-in-ppr.png&w=1920&q=75&dpl=dpl_A8AJ5FwmLMU94D4JXDc9U5wQRc6m)

### 사용 이유

- 정적 경로 셸이 제공되므로 초기 로딩이 빠릅니다.
- 셸은 동적 콘텐츠가 비동기식으로 로드되는 구멍을 남깁니다.
- 비동기 홀은 병렬로 로드되므로 페이지의 전체 로드 시간이 단축됩니다.

> 부분 사전 렌더링 목표 [Building towards a new default rendering model for web applications](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model)

### 애플리케이션에서 데이터 가져오기를 최적화하기 위해 몇 가지 작업

- 서버와 데이터베이스 사이의 지연 시간을 줄이기 위해 애플리케이션 코드와 동일한 영역에 데이터베이스를 생성했습니다.
- `React Server Components`를 사용하여 서버에서 데이터를 불러왔습니다. 이렇게 하면 비용이 많이 드는 데이터 불러오기와 로직을 서버에 유지하고 클라이언트 측 `JavaScript` 번들을 줄이며 데이터베이스 비밀이 클라이언트에 노출되는 것을 방지할 수 있습니다.
- `SQL`을 사용하여 필요한 데이터만 가져오기 때문에 각 요청에 대해 전송되는 데이터의 양과 데이터를 인메모리로 변환하는 데 필요한 `JavaScript`의 양이 줄어듭니다.
- 데이터 불러오기를 자바스크립트로 병렬 처리하는 것이 합당한 경우.
- 느린 데이터 요청으로 인해 전체 페이지가 차단되는 것을 방지하고 사용자가 모든 페이지가 로드될 때까지 기다릴 필요 없이 UI와 상호 작용을 시작할 수 있도록 스트리밍을 구현했습니다.
- 데이터 가져오기를 필요한 컴포넌트로 이동하여 부분 프리렌더링에 대비하여 경로의 어느 부분을 동적으로 유지해야 하는지 분리합니다.

## 검색 및 페이지 매김

### URL 검색 매개변수를 사용하는 이유는??

**URL 매개변수로 검색 구현시 이점**
- **북마크 및 고유가능한 URL** : 검색 매개변수가 URL에 있으므로 사용자는 검색 쿼리 및 필터를 포함한 애플리케이션의 현재 상태를 북마크에 추가하여 나중에 참조하거나 공유할 수 있습니다.
- **서버 측 렌더링 및 초기 로드** :  URL 매개변수를 서버에서 직접 사용하여 초기 상태를 렌더링할 수 있으므로 서버 렌더링을 더 쉽게 처리할 수 있습니다.
- **분석 및 추척** : URL에 직접 검색 쿼리와 필터를 사용하면 추가적인 클라이언트 측 로직 없이도 사용자 행동을 더 쉽게 추적할 수 있습니다.

### 검색 기능 부분에 사용할 수 있는 Hooks

- `useSearchParams` : 현재 URL 매개변수에 엑세스가 가능합니다. 
  - Ex ) `/dashboard/invoices?page=1&query=pending`다음과 같습니다 `{page: '1', query: 'pending'}`.
- `usePathname` : 현재 URL의 경로명을 읽을 수 있습니다.
  - Ex ) `/dashboard/invoices?page=1&query=pending`다음과 같습니다. `/dashboard/invoices`
- `useRouter` : 프로그래밍 방식으로 클라이언트 구성 요소 내의 경로 간 탐색을 활성화 합니다.


> **defaultValue vs. value / Controlled vs. Uncontrolled**  
>  **state를 사용하여** 입력의 값을 관리하는 경우, `value`속성을 사용하여 제어되는 컴포넌트로 만든 다는 것으로 이는 **React가 입력의 상태를 관리**한다는 것을 의미합니다.  
> 하지만 **state를 사용하지 않는다면** `defaultValue`를 사용할 수 있습니다.  
> 이는 네이티브 입력이 자체 상태를 관리한다는 뜻이며 상태 대신 URL에 검색 쿼리를 저장하기 때문에 괜찮습니다.

### Next.js에서 언제 useSearchParams hook과 searchParams Props를 구분하여 사용해야 할까??

**Server Components**일 경우 페이지에서 Components로 `searchParams` 프로퍼티를 전달 할 수 있으므로 `searchParams`를 사용합니다.

그리고 일반적으로 클라이언트에서 매개변수를 읽으려면 서버로 갈 필요가 없기 때문에 `useSearchParams()` Hook을 사용합니다.


### 검색 시 Debouncing 

Debouncing 함수가 실행될 수 있는 속도를 제한하는 프로그래밍 방식입니다.  
우리의 경우에는 사용자가 입력을 중단한 경우에만 데이터베이스를 쿼리하려고 합니다.

- **이벤트 트리거(Trigger Event)**: 검색창의 키 입력과 같이 디바운스되어야 하는 이벤트가 발생하면 타이머가 시작됩니다.
- **대기(Wait)**: 타이머가 만료되기 전에 새 이벤트가 발생하면 타이머가 재설정됩니다.
- **실행(Execution)**: 타이머의 카운트다운이 끝나면 디바운스된 함수가 실행됩니다.

## 데이터 변경

### Server Actions

**Server Actions이란?**  
서버에서 직접 비동기 코드를 실행할 수 있습니다.  
데이터를 변경하기 위해 API 엔드포인트를 만들 필요가 없습니다.  
대신 서버에서 실행되는 비동기 함수를 작성하고 클라이언트 또는 서버 컴포넌트에서 호출할 수 있습니다.

**Server Action이 필요한 이유??**
- 다양한 유형의 공격으로부터 보호
- 권한이 부여된 액세스를 보장
- POST 요청, 암호화된 종료, 엄격한 입력 확인, 오류 메시지 해싱, 호스트 제한등의 기술을 하며 앱의 안정성을 크게 향상


### Server Action 생성

1. 파일 상단에 `'use server';` 추가

> **Tip** : HTML에서는 작업 속성에 URL을 전달합니다. 이 URL은 양식 데이터를 제출해야 하는 대상(일반적으로 API 엔드포인트)이 됩니다.  
> 하지만 React에서 action 어트리뷰트는 특별한 소품으로 간주되며, 이는 React가 액션을 호출할 수 있도록 그 위에 빌드된다는 것을 의미합니다.  
> 서버 액션은 **POST API 엔드포인트**를 생성합니다. 그렇기 때문에 서버 액션을 사용할 때 API 엔드포인트를 **수동으로 만들 필요가 없습니다.**


### 재검증 및 리다이렉션

Next.js에는 사용자 브라우저에 일정 시간 동안 경로 세그먼트를 저장하는 **클라이언트 측 라우터 캐시가 있습니다.**

이 캐시는 프리페칭과 함께 사용자가 서버에 대한 요청 횟수를 줄이면서 경로 사이를 빠르게 탐색할 수 있도록 해줍니다.

**action 부분**
```typescript
'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  /** 재검증 */
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

데이터베이스가 업데이트되면 `/dashboard/invoices`경로의 유효성이 다시 검사되고 서버에서 새로운 데이터를 가져옵니다.

이 시점에서 사용자를 `/dashboard/invoices` 페이지로 다시 리디렉션하려고 합니다. Next.js의 함수를 사용하여 이 작업을 수행할 수 있습니다

> [서버 보안](https://nextjs.org/blog/security-nextjs-server-components-actions)

## 오류 처리

**action 부분**
```typescript
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
```

`error.tsx`파일은 경로 세그먼트에 대한 UI 경계를 정의하는 데 사용할 수 있습니다.  
예상치 못한 오류에 대한 포괄적인 역할을 하며 사용자에게 대체 UI를 표시할 수 있습니다.

- `"use clinet"` `error.tsx`는 클라이언트 구성 요소여야 합니다. 
- 두 가지 props를 가집니다.
  - `error` : `javascript`의 기본 객체 `Error`
  - `reset` : 오류 경계 재설정하는 기능 실행되면 함수는 경로 세그먼트를 다시 렌더링하려고 시도 합니다.

`error.tsx`는 모든 오류를 포착하는 데 유용하지만, `notFound`는 존재하지 않는 리소스를 가져오려고 할 때 사용할 수 있습니다.

**주의 사항**  
명심해야 할 점은 `notFound`가 `error.tsx`보다 우선하므로 보다 구체적인 오류를 처리하고 싶을 때 사용할 수 있다는 것입니다!

```typescript
import { notFound } from 'next/navigation';

//...
if (!invoice) {
  notFound();
}
//...
```

## 접근성

> [web.dev로 접근성 자세히 알아보기](https://web.dev/)

### Next.js에서 ESLint 접근성 플러그인 사용

`eslint-plugin-jsx-a11y` 접근성 문제를 조기에 발견하는 데 도움이 되는 플러그인입니다.

### 양식 접근성 개선

- **시맨틱 태그(Semantic HTML)** : `<div>`말고 `<input>`, `<option>` 등 사용하여 보조 기술(AT)이 입력 요소에 집중하고 사용자에게 적절한 컨텍스트 정보를 제공하여 양식을 탐색하고 이해하기 쉽게 만들 수 있습니다.
- **라벨링(Labelling)** : <label>과 htmlFor 속성을 포함하면 각 양식 필드에 설명 텍스트 레이블이 지정됩니다.
- **초점 윤곽선(Focus Outline)** : **필드에 초점이 맞춰지면 윤곽선**이 표시되도록 적절한 스타일이 지정됩니다. 이는 페이지의 활성 요소를 시각적으로 표시하여 키보드 및 화면 리더 사용자가 양식의 현재 위치를 이해하는 데 도움이 되므로 접근성을 위해 매우 중요합니다. **탭을 눌러 이를 확인할 수 있습니다.**

### 서버 측 유효성 양식 검증

- 데이터를 데이터베이스로 보내기 전에 데이터가 예상된 형식인지 확인하세요.
- 악의적인 사용자가 클라이언트 측 유효성 검사를 우회하는 위험을 줄입니다.
- 유효한 데이터 로 간주되는 정보에 대한 하나의 진실 소스를 확보하세요 .

```typescript
'use client';
 
// ...
import { useFormState } from 'react-dom';
```

`useFormSate` 후크는 다음와 같습니다.
- 두 개의 인수를 사용합니다: `(action, initialState)`.
- 두 가지 값을 반환합니다: `[state, dispatch]`

```typescript
// ...
// ...
import { useFormState } from 'react-dom';
 
export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);
 
  return <form action={dispatch}>...</form>;
}
```