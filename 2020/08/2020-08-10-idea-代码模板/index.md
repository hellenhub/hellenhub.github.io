# IDEA 代码模板


# IDEA 代码模板

---

## Getter And Setter

---

### Getter

```java
/**
* Getter method for property <tt>$field.name</tt>.
*
* @return property value of $field.name
*/
#if($field.modifierStatic)
static ##
#end
$field.type ##
#set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))
#if ($field.boolean && $field.primitive)
is##
#else
get##
#end
${name}() {
return $field.name;
}
```

### Setter

```java
/**
* Setter method for property <tt>$field.name</tt>.
*
* @param $field.name  value to be assigned to property $field.name
*/
#set($paramName = $helper.getParamName($field, $project))
#if($field.modifierStatic)
static ##
#end
void set$StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project)))($field.type $paramName) {
#if ($field.name == $paramName)
    #if (!$field.modifierStatic)
    this.##
    #else
        $classname.##
    #end
#end
$field.name = $paramName;
}
```

---

## Code Style

```xml
<code_scheme name="JonnyChang-CodeStyle" version="1">
  <option name="INSERT_INNER_CLASS_IMPORTS" value="true" />
  <option name="CLASS_COUNT_TO_USE_IMPORT_ON_DEMAND" value="999" />
  <option name="NAMES_COUNT_TO_USE_IMPORT_ON_DEMAND" value="999" />
  <option name="IMPORT_LAYOUT_TABLE">
    <value>
      <package name="java" withSubpackages="true" static="false" />
      <emptyLine />
      <package name="javax" withSubpackages="true" static="false" />
      <emptyLine />
      <package name="com.jonnyhub" withSubpackages="true" static="false" />
      <emptyLine />
      <package name="" withSubpackages="true" static="false" />
      <emptyLine />
      <package name="" withSubpackages="true" static="true" />
    </value>
  </option>
  <option name="RIGHT_MARGIN" value="140" />
  <option name="ENABLE_JAVADOC_FORMATTING" value="false" />
  <JavaCodeStyleSettings>
    <option name="ANNOTATION_PARAMETER_WRAP" value="1" />
    <option name="INSERT_INNER_CLASS_IMPORTS" value="true" />
    <option name="CLASS_COUNT_TO_USE_IMPORT_ON_DEMAND" value="999" />
    <option name="NAMES_COUNT_TO_USE_IMPORT_ON_DEMAND" value="999" />
    <option name="IMPORT_LAYOUT_TABLE">
      <value>
        <package name="java" withSubpackages="true" static="false" />
        <emptyLine />
        <package name="javax" withSubpackages="true" static="false" />
        <emptyLine />
        <package name="com.jonnyhub" withSubpackages="true" static="false" />
        <emptyLine />
        <package name="" withSubpackages="true" static="false" />
        <emptyLine />
        <package name="" withSubpackages="true" static="true" />
      </value>
    </option>
    <option name="JD_KEEP_INVALID_TAGS" value="false" />
    <option name="JD_DO_NOT_WRAP_ONE_LINE_COMMENTS" value="true" />
  </JavaCodeStyleSettings>
  <codeStyleSettings language="JAVA">
    <option name="LINE_COMMENT_AT_FIRST_COLUMN" value="false" />
    <option name="BLOCK_COMMENT_AT_FIRST_COLUMN" value="false" />
    <option name="KEEP_FIRST_COLUMN_COMMENT" value="false" />
    <option name="KEEP_CONTROL_STATEMENT_IN_ONE_LINE" value="false" />
    <option name="KEEP_BLANK_LINES_IN_DECLARATIONS" value="1" />
    <option name="KEEP_BLANK_LINES_IN_CODE" value="1" />
    <option name="KEEP_BLANK_LINES_BEFORE_RBRACE" value="1" />
    <option name="ALIGN_MULTILINE_PARAMETERS" value="false" />
    <option name="ALIGN_GROUP_FIELD_DECLARATIONS" value="true" />
    <option name="SPACE_BEFORE_ARRAY_INITIALIZER_LBRACE" value="true" />
    <option name="CALL_PARAMETERS_WRAP" value="1" />
    <option name="PREFER_PARAMETERS_WRAP" value="true" />
    <option name="METHOD_PARAMETERS_WRAP" value="1" />
    <option name="RESOURCE_LIST_WRAP" value="1" />
    <option name="EXTENDS_LIST_WRAP" value="1" />
    <option name="THROWS_LIST_WRAP" value="1" />
    <option name="EXTENDS_KEYWORD_WRAP" value="1" />
    <option name="THROWS_KEYWORD_WRAP" value="1" />
    <option name="METHOD_CALL_CHAIN_WRAP" value="1" />
    <option name="BINARY_OPERATION_WRAP" value="1" />
    <option name="BINARY_OPERATION_SIGN_ON_NEXT_LINE" value="true" />
    <option name="TERNARY_OPERATION_WRAP" value="1" />
    <option name="TERNARY_OPERATION_SIGNS_ON_NEXT_LINE" value="true" />
    <option name="KEEP_SIMPLE_BLOCKS_IN_ONE_LINE" value="true" />
    <option name="KEEP_SIMPLE_METHODS_IN_ONE_LINE" value="true" />
    <option name="KEEP_SIMPLE_CLASSES_IN_ONE_LINE" value="true" />
    <option name="FOR_STATEMENT_WRAP" value="1" />
    <option name="ARRAY_INITIALIZER_WRAP" value="1" />
    <option name="ASSIGNMENT_WRAP" value="1" />
    <option name="PLACE_ASSIGNMENT_SIGN_ON_NEXT_LINE" value="true" />
    <option name="WRAP_COMMENTS" value="true" />
    <option name="ASSERT_STATEMENT_WRAP" value="1" />
    <option name="ASSERT_STATEMENT_COLON_ON_NEXT_LINE" value="true" />
    <option name="IF_BRACE_FORCE" value="3" />
    <option name="DOWHILE_BRACE_FORCE" value="3" />
    <option name="WHILE_BRACE_FORCE" value="3" />
    <option name="FOR_BRACE_FORCE" value="3" />
    <option name="WRAP_LONG_LINES" value="true" />
    <option name="PARAMETER_ANNOTATION_WRAP" value="1" />
    <option name="VARIABLE_ANNOTATION_WRAP" value="2" />
    <option name="ENUM_CONSTANTS_WRAP" value="2" />
  </codeStyleSettings>
</code_scheme>

```

