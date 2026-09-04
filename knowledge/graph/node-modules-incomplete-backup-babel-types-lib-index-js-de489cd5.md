---
path: "node_modules.incomplete-backup/@babel/types/lib/index.js"
language: javascript
generated_by: DevTeam CodeGraph
---

# node_modules.incomplete-backup/@babel/types/lib/index.js

## Imports

- [[graph/node-modules-incomplete-backup-babel-types-lib-asserts-assertnode-js-e56d6428|node_modules.incomplete-backup/@babel/types/lib/asserts/assertNode.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-asserts-generated-index-js-11a8d3bb|node_modules.incomplete-backup/@babel/types/lib/asserts/generated/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-flow-createflowuniontype-37eca5a4|node_modules.incomplete-backup/@babel/types/lib/builders/flow/createFlowUnionType.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-flow-createtypeannotatio-966434b9|node_modules.incomplete-backup/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-generated-index-js-8055da99|node_modules.incomplete-backup/@babel/types/lib/builders/generated/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-productions-js-bfa0b199|node_modules.incomplete-backup/@babel/types/lib/builders/productions.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-react-buildchildren-js-28c7e422|node_modules.incomplete-backup/@babel/types/lib/builders/react/buildChildren.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-typescript-createtsunion-07290a4e|node_modules.incomplete-backup/@babel/types/lib/builders/typescript/createTSUnionType.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-clone-clone-js-28d866cd|node_modules.incomplete-backup/@babel/types/lib/clone/clone.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-clone-clonedeep-js-0c4a4f59|node_modules.incomplete-backup/@babel/types/lib/clone/cloneDeep.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-clone-clonedeepwithoutloc-js-b6c38deb|node_modules.incomplete-backup/@babel/types/lib/clone/cloneDeepWithoutLoc.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-clone-clonenode-js-c5fbd3e3|node_modules.incomplete-backup/@babel/types/lib/clone/cloneNode.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-clone-clonewithoutloc-js-0e3ccc7e|node_modules.incomplete-backup/@babel/types/lib/clone/cloneWithoutLoc.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-addcomment-js-c5b8516c|node_modules.incomplete-backup/@babel/types/lib/comments/addComment.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-addcomments-js-fd7f6a5b|node_modules.incomplete-backup/@babel/types/lib/comments/addComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-inheritinnercomments-js-6497b0de|node_modules.incomplete-backup/@babel/types/lib/comments/inheritInnerComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-inheritleadingcomments-j-82858c75|node_modules.incomplete-backup/@babel/types/lib/comments/inheritLeadingComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-inherittrailingcomments--f57ed5b6|node_modules.incomplete-backup/@babel/types/lib/comments/inheritTrailingComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-inheritscomments-js-45a697a9|node_modules.incomplete-backup/@babel/types/lib/comments/inheritsComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-comments-removecomments-js-2428d2df|node_modules.incomplete-backup/@babel/types/lib/comments/removeComments.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-constants-generated-index-js-e76bc460|node_modules.incomplete-backup/@babel/types/lib/constants/generated/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-constants-index-js-58169133|node_modules.incomplete-backup/@babel/types/lib/constants/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-ensureblock-js-ce7751e9|node_modules.incomplete-backup/@babel/types/lib/converters/ensureBlock.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-tobindingidentifiernam-e6311ba0|node_modules.incomplete-backup/@babel/types/lib/converters/toBindingIdentifierName.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-toblock-js-08d0cb73|node_modules.incomplete-backup/@babel/types/lib/converters/toBlock.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-tocomputedkey-js-8d2367a4|node_modules.incomplete-backup/@babel/types/lib/converters/toComputedKey.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-toexpression-js-ad513040|node_modules.incomplete-backup/@babel/types/lib/converters/toExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-toidentifier-js-3ca6803d|node_modules.incomplete-backup/@babel/types/lib/converters/toIdentifier.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-tokeyalias-js-cd746e2c|node_modules.incomplete-backup/@babel/types/lib/converters/toKeyAlias.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-tosequenceexpression-j-2bde4417|node_modules.incomplete-backup/@babel/types/lib/converters/toSequenceExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-tostatement-js-20d29b1b|node_modules.incomplete-backup/@babel/types/lib/converters/toStatement.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-converters-valuetonode-js-fd2f49df|node_modules.incomplete-backup/@babel/types/lib/converters/valueToNode.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-definitions-index-js-589ebe57|node_modules.incomplete-backup/@babel/types/lib/definitions/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-appendtomemberexpre-f414083b|node_modules.incomplete-backup/@babel/types/lib/modifications/appendToMemberExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-flow-removetypedupl-b971bdea|node_modules.incomplete-backup/@babel/types/lib/modifications/flow/removeTypeDuplicates.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-inherits-js-227bd003|node_modules.incomplete-backup/@babel/types/lib/modifications/inherits.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-prependtomemberexpr-4ac506c6|node_modules.incomplete-backup/@babel/types/lib/modifications/prependToMemberExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-removeproperties-js-b3a97368|node_modules.incomplete-backup/@babel/types/lib/modifications/removeProperties.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-removepropertiesdee-b7808e83|node_modules.incomplete-backup/@babel/types/lib/modifications/removePropertiesDeep.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-retrievers-getassignmentidentifie-7915f612|node_modules.incomplete-backup/@babel/types/lib/retrievers/getAssignmentIdentifiers.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-retrievers-getbindingidentifiers--2c27fb81|node_modules.incomplete-backup/@babel/types/lib/retrievers/getBindingIdentifiers.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-retrievers-getfunctionname-js-32582193|node_modules.incomplete-backup/@babel/types/lib/retrievers/getFunctionName.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-retrievers-getouterbindingidentif-231bd48d|node_modules.incomplete-backup/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-traverse-traverse-js-caf6b887|node_modules.incomplete-backup/@babel/types/lib/traverse/traverse.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-traverse-traversefast-js-33dbbe04|node_modules.incomplete-backup/@babel/types/lib/traverse/traverseFast.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-utils-deprecationwarning-js-896aebf3|node_modules.incomplete-backup/@babel/types/lib/utils/deprecationWarning.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-utils-shallowequal-js-63f6e691|node_modules.incomplete-backup/@babel/types/lib/utils/shallowEqual.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-buildmatchmemberexpres-a16104ac|node_modules.incomplete-backup/@babel/types/lib/validators/buildMatchMemberExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-generated-index-js-72b7ec1c|node_modules.incomplete-backup/@babel/types/lib/validators/generated/index.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-is-js-9e1db014|node_modules.incomplete-backup/@babel/types/lib/validators/is.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isbinding-js-0a04b0a6|node_modules.incomplete-backup/@babel/types/lib/validators/isBinding.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isblockscoped-js-a40be740|node_modules.incomplete-backup/@babel/types/lib/validators/isBlockScoped.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isimmutable-js-dc6e5684|node_modules.incomplete-backup/@babel/types/lib/validators/isImmutable.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-islet-js-582452cc|node_modules.incomplete-backup/@babel/types/lib/validators/isLet.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isnode-js-59627d56|node_modules.incomplete-backup/@babel/types/lib/validators/isNode.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isnodesequivalent-js-2d4e8d1c|node_modules.incomplete-backup/@babel/types/lib/validators/isNodesEquivalent.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isplaceholdertype-js-8b8900f5|node_modules.incomplete-backup/@babel/types/lib/validators/isPlaceholderType.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isreferenced-js-57aad364|node_modules.incomplete-backup/@babel/types/lib/validators/isReferenced.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isscope-js-a4d881b4|node_modules.incomplete-backup/@babel/types/lib/validators/isScope.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isspecifierdefault-js-7287dda2|node_modules.incomplete-backup/@babel/types/lib/validators/isSpecifierDefault.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-istype-js-bb815dc7|node_modules.incomplete-backup/@babel/types/lib/validators/isType.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isvalides3identifier-j-42bbe52f|node_modules.incomplete-backup/@babel/types/lib/validators/isValidES3Identifier.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isvalididentifier-js-293a535b|node_modules.incomplete-backup/@babel/types/lib/validators/isValidIdentifier.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-isvar-js-b3514ee5|node_modules.incomplete-backup/@babel/types/lib/validators/isVar.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-matchespattern-js-37adc6b8|node_modules.incomplete-backup/@babel/types/lib/validators/matchesPattern.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-react-iscompattag-js-5b55e5e1|node_modules.incomplete-backup/@babel/types/lib/validators/react/isCompatTag.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-react-isreactcomponent-d92920f4|node_modules.incomplete-backup/@babel/types/lib/validators/react/isReactComponent.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-validators-validate-js-c0f5dcca|node_modules.incomplete-backup/@babel/types/lib/validators/validate.js]]

## Imported by

- [[graph/node-modules-incomplete-backup-babel-types-lib-builders-validatenode-js-870f6333|node_modules.incomplete-backup/@babel/types/lib/builders/validateNode.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-modifications-prependtomemberexpr-4ac506c6|node_modules.incomplete-backup/@babel/types/lib/modifications/prependToMemberExpression.js]]
- [[graph/node-modules-incomplete-backup-babel-types-lib-utils-react-cleanjsxelementlitera-7df04ee5|node_modules.incomplete-backup/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js]]

## Exports

- `react`
- `toSequenceExpression`

## External dependencies

- None.
