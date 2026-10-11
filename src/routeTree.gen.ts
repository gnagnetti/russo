/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as EsameRouteImport } from './routes/esame'
import { Route as PraticaRouteImport } from './routes/pratica'
import { Route as StatisticheRouteImport } from './routes/statistiche'
import { Route as TeoriaRouteImport } from './routes/teoria'
import { Route as FlashcardsRouteImport } from './routes/flashcards'
import { Route as ScritturaRouteImport } from './routes/scrittura'
import { Route as DeclinatoreRouteImport } from './routes/declinatore'
import { Route as AccentiRouteImport } from './routes/accenti'
import { Route as StampaRouteImport } from './routes/stampa'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const EsameRoute = EsameRouteImport.update({
  id: '/esame',
  path: '/esame',
  getParentRoute: () => rootRouteImport,
} as any)
const PraticaRoute = PraticaRouteImport.update({
  id: '/pratica',
  path: '/pratica',
  getParentRoute: () => rootRouteImport,
} as any)
const StatisticheRoute = StatisticheRouteImport.update({
  id: '/statistiche',
  path: '/statistiche',
  getParentRoute: () => rootRouteImport,
} as any)
const TeoriaRoute = TeoriaRouteImport.update({
  id: '/teoria',
  path: '/teoria',
  getParentRoute: () => rootRouteImport,
} as any)
const FlashcardsRoute = FlashcardsRouteImport.update({
  id: '/flashcards',
  path: '/flashcards',
  getParentRoute: () => rootRouteImport,
} as any)
const ScritturaRoute = ScritturaRouteImport.update({
  id: '/scrittura',
  path: '/scrittura',
  getParentRoute: () => rootRouteImport,
} as any)
const DeclinatoreRoute = DeclinatoreRouteImport.update({
  id: '/declinatore',
  path: '/declinatore',
  getParentRoute: () => rootRouteImport,
} as any)
const AccentiRoute = AccentiRouteImport.update({
  id: '/accenti',
  path: '/accenti',
  getParentRoute: () => rootRouteImport,
} as any)
const StampaRoute = StampaRouteImport.update({
  id: '/stampa',
  path: '/stampa',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/esame': typeof EsameRoute
  '/pratica': typeof PraticaRoute
  '/statistiche': typeof StatisticheRoute
  '/teoria': typeof TeoriaRoute
  '/flashcards': typeof FlashcardsRoute
  '/scrittura': typeof ScritturaRoute
  '/declinatore': typeof DeclinatoreRoute
  '/accenti': typeof AccentiRoute
  '/stampa': typeof StampaRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/esame': typeof EsameRoute
  '/pratica': typeof PraticaRoute
  '/statistiche': typeof StatisticheRoute
  '/teoria': typeof TeoriaRoute
  '/flashcards': typeof FlashcardsRoute
  '/scrittura': typeof ScritturaRoute
  '/declinatore': typeof DeclinatoreRoute
  '/accenti': typeof AccentiRoute
  '/stampa': typeof StampaRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/esame': typeof EsameRoute
  '/pratica': typeof PraticaRoute
  '/statistiche': typeof StatisticheRoute
  '/teoria': typeof TeoriaRoute
  '/flashcards': typeof FlashcardsRoute
  '/scrittura': typeof ScritturaRoute
  '/declinatore': typeof DeclinatoreRoute
  '/accenti': typeof AccentiRoute
  '/stampa': typeof StampaRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/esame' | '/pratica' | '/statistiche' | '/teoria' | '/flashcards' | '/scrittura' | '/declinatore' | '/accenti' | '/stampa'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/esame' | '/pratica' | '/statistiche' | '/teoria' | '/flashcards' | '/scrittura' | '/declinatore' | '/accenti' | '/stampa'
  id: '__root__' | '/' | '/esame' | '/pratica' | '/statistiche' | '/teoria' | '/flashcards' | '/scrittura' | '/declinatore' | '/accenti' | '/stampa'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EsameRoute: typeof EsameRoute
  PraticaRoute: typeof PraticaRoute
  StatisticheRoute: typeof StatisticheRoute
  TeoriaRoute: typeof TeoriaRoute
  FlashcardsRoute: typeof FlashcardsRoute
  ScritturaRoute: typeof ScritturaRoute
  DeclinatoreRoute: typeof DeclinatoreRoute
  AccentiRoute: typeof AccentiRoute
  StampaRoute: typeof StampaRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/esame': {
      id: '/esame'
      path: '/esame'
      fullPath: '/esame'
      preLoaderRoute: typeof EsameRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/pratica': {
      id: '/pratica'
      path: '/pratica'
      fullPath: '/pratica'
      preLoaderRoute: typeof PraticaRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/statistiche': {
      id: '/statistiche'
      path: '/statistiche'
      fullPath: '/statistiche'
      preLoaderRoute: typeof StatisticheRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/teoria': {
      id: '/teoria'
      path: '/teoria'
      fullPath: '/teoria'
      preLoaderRoute: typeof TeoriaRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/flashcards': {
      id: '/flashcards'
      path: '/flashcards'
      fullPath: '/flashcards'
      preLoaderRoute: typeof FlashcardsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/scrittura': {
      id: '/scrittura'
      path: '/scrittura'
      fullPath: '/scrittura'
      preLoaderRoute: typeof ScritturaRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/declinatore': {
      id: '/declinatore'
      path: '/declinatore'
      fullPath: '/declinatore'
      preLoaderRoute: typeof DeclinatoreRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/accenti': {
      id: '/accenti'
      path: '/accenti'
      fullPath: '/accenti'
      preLoaderRoute: typeof AccentiRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/stampa': {
      id: '/stampa'
      path: '/stampa'
      fullPath: '/stampa'
      preLoaderRoute: typeof StampaRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EsameRoute: EsameRoute,
  PraticaRoute: PraticaRoute,
  StatisticheRoute: StatisticheRoute,
  TeoriaRoute: TeoriaRoute,
  FlashcardsRoute: FlashcardsRoute,
  ScritturaRoute: ScritturaRoute,
  DeclinatoreRoute: DeclinatoreRoute,
  AccentiRoute: AccentiRoute,
  StampaRoute: StampaRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
