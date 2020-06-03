import React, {useState} from 'react'
import './QueryForm.css'

export default function QueryForm() {
    const [Key, setKey] = useState('wp_')
    const [Base, setBase] = useState('http://www.old-domain.com')
    const [Target, setTarget] = useState('http://www.new-domain.com')
    const [Guid, setGuid] = useState(false)

    const handleKey = event => {
        setKey(event.target.value);
    }
    const handleBase = event => {
        setBase(event.target.value);
    }
    const handleTarget = event => {
        setTarget(event.target.value);
    }
    const handleGuid = event => {
        setGuid(event.target.checked);
    }
    const getOnlyDomain = string => {
        const str = string.split('://')
        return str[1]
    }

    const textAreaValue = (base, target, guid = false, withProtocol = true) => {
        const firstLine = `UPDATE ${Key}options SET option_value = replace(option_value, '${withProtocol ? base : getOnlyDomain(base)}', '${withProtocol ? target : getOnlyDomain(target)}') WHERE option_name = 'home' OR option_name = 'siteurl';\n`
        const secondLine = guid ? `UPDATE ${Key}posts SET guid = replace(guid, '${withProtocol ? base : getOnlyDomain(base)}', '${withProtocol ? target : getOnlyDomain(target)}');\n` : ''
        const thirdLine = `UPDATE ${Key}posts SET post_content = replace(post_content, '${withProtocol ? base : getOnlyDomain(base)}', '${withProtocol ? target : getOnlyDomain(target)}');\n`
        const fourthLine = `UPDATE ${Key}postmeta SET meta_value = replace(meta_value, '${withProtocol ? base : getOnlyDomain(base)}','${withProtocol ? target : getOnlyDomain(target)}');\n`
        return firstLine + secondLine + thirdLine + fourthLine
    }

    return (
        <>
            <div className="options">
                <input type="text" placeholder="Clée" value={Key} onChange={handleKey}/>
                <input type="text" placeholder="Domaine de base" value={Base} onChange={handleBase}/>
                <input type="text" placeholder="Domaine cible" value={Target} onChange={handleTarget}/>
                <label>
                    GUID ?
                    <input type="checkbox" name="guid" checked={Guid ? 'checked' : ''} onChange={handleGuid}/>
                </label>
            </div>
            <textarea rows="7" cols="100" value={textAreaValue(Base, Target, Guid)}></textarea>
            <textarea rows="7" cols="100" value={textAreaValue(Base, Target, Guid, false)}></textarea>
        </>
    )
}
