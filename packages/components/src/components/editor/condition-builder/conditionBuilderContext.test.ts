import { describe, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import {
  ConditionBuilderProvider,
  useConditionBuilderContext,
  type ConditionGroupData
} from '@/components/editor/condition-builder/conditionBuilderContext';
import type { ConditionMode } from '@/components/editor/condition-builder/conditionBuilder';

const typeOptions = {
  'equal to': '==',
  'not equal to': '!=',
  'is true': 'isTrue',
  'is false': 'isFalse',
  'is empty': 'isEmpty',
  'is not empty': 'isNotEmpty',
  'less than': '<',
  'greater than': '>',
  'less or equal to': '<=',
  'greater or equal to': '>='
};

const logicalOperatorOptions = {
  and: '&&',
  or: '||'
};

const simpleConditionString = (conditionMode: ConditionMode, conditionGroups: ConditionGroupData[]) => {
  const groupStrings = conditionGroups.map((group, index) => {
    if (conditionMode === 'basic-condition' && index > 0) return '';
    return group.conditions.map(con => `${con.argument1} ${typeOptions[con.operator]} ${con.argument2}`).join('');
  });
  return groupStrings.join('');
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  ConditionBuilderProvider({ children, typeOptions, logicalOperatorOptions, generateConditionString: simpleConditionString });

const renderConditionBuilderHook = () => renderHook(() => useConditionBuilderContext(), { wrapper });

describe('ConditionBuilderContext', () => {
  test('initialize with one condition group', () => {
    const { result } = renderConditionBuilderHook();

    expect(result.current.conditionGroups.length).toBe(1);
    expect(result.current.conditionGroups[0].conditions.length).toBe(1);
    expect(result.current.conditionMode).toBe('basic-condition');
  });

  test('add condition group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.addConditionGroup());
    expect(result.current.conditionGroups.length).toBe(2);
  });

  test('remove condition group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.addConditionGroup());
    expect(result.current.conditionGroups.length).toBe(2);

    act(() => result.current.removeConditionGroup(0));
    expect(result.current.conditionGroups.length).toBe(1);
  });

  test('add condition to a group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.addCondition(0));
    expect(result.current.conditionGroups[0].conditions.length).toBe(2);
  });

  test('remove condition from group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.addCondition(0));
    expect(result.current.conditionGroups[0].conditions.length).toBe(2);

    act(() => result.current.removeCondition(0, 1));
    expect(result.current.conditionGroups[0].conditions.length).toBe(1);
  });

  test('update condition in group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.updateCondition(0, 0, 'argument1', 'testArg'));
    expect(result.current.conditionGroups[0].conditions[0].argument1).toBe('testArg');
  });

  test('update logical operator of group', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.updateLogicalOperator(0, 'or'));
    expect(result.current.conditionGroups[0].logicalOperator).toBe('or');
  });

  test('generate correct condition string', () => {
    const { result } = renderConditionBuilderHook();

    act(() => {
      result.current.updateCondition(0, 0, 'argument1', 'data.value');
      result.current.updateCondition(0, 0, 'operator', 'equal to');
      result.current.updateCondition(0, 0, 'argument2', '10');
    });

    const conditionString = result.current.generateConditionString();
    expect(conditionString).toBe('data.value == 10');
  });

  test('toggle condition group enabled state', () => {
    const { result } = renderConditionBuilderHook();

    act(() => result.current.setConditionMode('nested-condition'));
    expect(result.current.conditionMode).toBe('nested-condition');

    act(() => result.current.setConditionMode('basic-condition'));
    expect(result.current.conditionMode).toBe('basic-condition');
  });
});