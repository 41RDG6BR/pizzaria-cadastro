import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../services/firebase'
import { useMounted } from '../'

function useCollection (collection) {
    const [data, setData] = useState(null)
    const { pathname } =  useLocation()
    const mounted = useMounted()

    const fetchCollectionData = useCallback(() => {
        db.collection(collection).get().then(querySnapshot => {
            let docs = []
            querySnapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            console.log('mounted ?', mounted.current)
            if (mounted.current) {
                setData(docs)
            } 
        })

    }, [collection, mounted])

    const add = useCallback((data) => {
        console.log('data add new', data)
        return db.collection(collection).add(data)
    }, [collection])

    const edit = useCallback((id, data) => {
        console.log('edit', id, data)
        return db.collection(collection).doc(id).set(data)
    }, [collection])

    const remove = useCallback(async (id) => {
        await db.collection(collection).doc(id).delete()
        fetchCollectionData()
        console.log('remove!', id)
    }, [collection, fetchCollectionData])

    useEffect(() => {
        fetchCollectionData()
    }, [pathname, fetchCollectionData])

    return {
        data,
        add,
        remove,
        edit
    }
}

export default useCollection