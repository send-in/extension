"use client"

// #region imports
import {
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react"
// #endregion

type EventPayloads = {
    "refresh": void
}

type EventKey = keyof EventPayloads

type Listener<K extends EventKey> = (
    payload: EventPayloads[K]
) => void

interface IEventsContext {
    emit: <K extends EventKey>(
        event: K,
        payload?: EventPayloads[K]
    ) => void

    on: <K extends EventKey>(
        event: K,
        listener: Listener<K>
    ) => () => void
}

const EventsContext = createContext<
    IEventsContext | null
>(null)

export const EventsProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const listeners = useRef(
        new Map<
            EventKey,
            Set<Function>
        >()
    )

    const emit = <K extends EventKey>(
        event: K,
        payload?: EventPayloads[K]
    ) => {
        const handlers =
            listeners.current.get(event)

        if (!handlers) return

        handlers.forEach(handler => {
            handler(payload)
        })
    }

    const on = <K extends EventKey>(
        event: K,
        listener: Listener<K>
    ) => {
        if (
            !listeners.current.has(event)
        ) {
            listeners.current.set(
                event,
                new Set()
            )
        }

        listeners
            .current
            .get(event)!
            .add(listener)

        return () => {
            listeners
                .current
                .get(event)
                ?.delete(listener)
        }
    }

    useEffect(() => {
        return on(
            "refresh",
            () => window.location.reload()
        )
    }, [])

    const value = {
        emit,
        on,
    }

    return (
        <EventsContext.Provider
            value={value}
        >
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(
        EventsContext
    )

    if (!context) {
        throw new Error(
            "useEvents must be used within EventsProvider"
        )
    }

    return context
}