import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query"
import React, { useState } from "react"
import { AppStateStatus } from "react-native"

// Configure focus management for React Native
function onAppStateChange(status: AppStateStatus) {
  // React Query already handles this internally, but if you want to debug and see
  // when the focus changes, you can use this
  focusManager.setFocused(status === "active")
}

interface QueryProviderProps {
  children: React.ReactNode
  // Optional configuration overrides
  defaultOptions?: {
    queries?: {
      retry?: boolean | number
      staleTime?: number
      cacheTime?: number
      refetchOnWindowFocus?: boolean
      refetchOnReconnect?: boolean
      refetchOnMount?: boolean
    }
    mutations?: {
      retry?: boolean | number
    }
  }
}

export function QueryProvider({
  children,
  defaultOptions = {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
}: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions,
        queryCache: new QueryCache({
          onError: (error, query) => {
            // Log errors to your error reporting service
            console.error("Query error:", error, query.queryKey)
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            // Log mutation errors to your error reporting service
            console.error("Mutation error:", error, mutation.options.mutationKey)
          },
        }),
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
