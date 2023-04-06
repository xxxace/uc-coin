import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

export default function MySwitch({ checked, icon, ...props }) {
    // const [enabled, setEnabled] = useState(checked || false)

    // useEffect(() => {
    //     setEnabled(checked)
    // }, [checked])

    return (
        <Switch
            checked={checked}
            {...props}
            className={`${checked ? 'bg-zinc-800 text-[#0ea5e9]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${checked ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'
                    } inline-block h-4 w-4 transform rounded-full transition`}
            >{icon ? icon : ''}</span>
        </Switch>
    )
}