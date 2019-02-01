import React, { Component } from 'react'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import Prism from 'prismjs'
import { EditorState, convertToRaw } from 'draft-js'
import CodeUtils from 'draft-js-code'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin'
import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createHashtagPlugin from 'draft-js-hashtag-plugin'

import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	CodeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton
} from 'draft-js-buttons'
import HeadlinesButton from './HeadlinesButton/HeadlinesButton'
import ImageButton from './ImageButton/ImageButton'

import editorStyles from './GBEditor.module.css'
import buttonStyles from './ToolbarStyles/buttonStyles.css'
import toolbarStyles from './ToolbarStyles/toolbarStyles.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js-hashtag-plugin/lib/plugin.css'
import 'prismjs/themes/prism-tomorrow.css'

// PLUGINS
const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const blockDndPlugin = createBlockDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const emojiPlugin = createEmojiPlugin()
const codeEditorPlugin = createCodeEditorPlugin()
const imagePlugin = createImagePlugin({
	decorator: composeDecorators(
		resizeablePlugin.decorator,
		alignmentPlugin.decorator,
		focusPlugin.decorator,
		blockDndPlugin.decorator
	)
})
const hashtagPlugin = createHashtagPlugin()
const toolbarPlugin = createToolbarPlugin({
	theme: { buttonStyles, toolbarStyles }
})
const prismPlugin = createPrismPlugin({
	// It's required to provide your own instance of Prism
	prism: Prism
})

const { AlignmentTool } = alignmentPlugin
const { Toolbar } = toolbarPlugin
const { EmojiSuggestions } = emojiPlugin

const plugins = [
	blockDndPlugin,
	focusPlugin,
	alignmentPlugin,
	resizeablePlugin,
	toolbarPlugin,
	imagePlugin,
	prismPlugin,
	emojiPlugin,
	codeEditorPlugin,
	hashtagPlugin
]

export default class GBEditor extends Component {
	state = {
		editorState: EditorState.createEmpty()
	}

	onChange = editorState => {
		this.setState({
			editorState
		})
	}

	focus = () => {
		this.editor.focus()
	}

	handleReturn = evt => {
		const { editorState } = this.state
		if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled'

		this.onChange(CodeUtils.handleReturn(evt, editorState))
		return 'handled'
	}

	blockStyleFn = block => {
		const key = block.getKey()
		if (block.getType() !== 'code-block') return

		const { editorState } = this.state

		const data = block.getData().merge({ language: 'javascript' })
		const newBlock = block.merge({ data })

		const currentContent = editorState.getCurrentContent()
		const currentSelection = editorState.getSelection()
		const blockMap = currentContent.getBlockMap()

		const newContentState = currentContent.merge({
			blockMap: blockMap.set(key, newBlock),
			selectionAfter: currentSelection
		})

		this.onChange(EditorState.push(editorState, newContentState, 'change-block-data'))
		return 'language-cpp'
	}

	render() {
		return (
			<div className={editorStyles.editor} onClick={this.focus}>
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					handleReturn={this.handleReturn}
					blockStyleFn={this.blockStyleFn}
					customStyleMap={styleMap}
					plugins={plugins}
					ref={element => {
						this.editor = element
					}}
				/>

				<Toolbar>
					{externalProps => (
						<>
							<BoldButton {...externalProps} />
							<ItalicButton {...externalProps} />
							<UnderlineButton {...externalProps} />
							<CodeButton {...externalProps} />
							<Separator {...externalProps} />
							<HeadlinesButton {...externalProps} />
							<ImageButton {...externalProps} />
							<UnorderedListButton {...externalProps} />
							<OrderedListButton {...externalProps} />
							<BlockquoteButton {...externalProps} />
							<CodeBlockButton {...externalProps} />
						</>
					)}
				</Toolbar>

				{/* <button
					onClick={() => {
						console.log(
							JSON.stringify(
								convertToRaw(this.state.editorState.getCurrentContent())
							)
						)
					}}
				>
					print raw
				</button> */}

				<AlignmentTool />
				<EmojiSuggestions />
			</div>
		)
	}
}

const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2
	}
}
