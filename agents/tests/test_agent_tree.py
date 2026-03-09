"""Integration tests for agent tree build and type verification."""

import os
import pytest

os.environ.setdefault("GOOGLE_API_KEY", "test-key-not-real")


class TestAgentTreeBuild:
    """Verify the full agent tree builds correctly with pure ADK types."""

    @pytest.fixture(autouse=True)
    def build_tree(self):
        from ai_factory_agent.agent import _build_root_agent
        self.root = _build_root_agent()

    def test_root_is_llm_agent(self):
        from google.adk.agents import Agent
        assert isinstance(self.root, Agent)
        assert self.root.name == "coordinator"

    def test_correct_sub_agent_count(self):
        assert len(self.root.sub_agents) == 24

    def test_all_pure_adk_types(self):
        from google.adk.agents import Agent, SequentialAgent, ParallelAgent, LoopAgent
        pure_types = (Agent, SequentialAgent, ParallelAgent, LoopAgent)

        def check(agent, path=""):
            agent_path = f"{path}/{agent.name}"
            assert isinstance(agent, pure_types), (
                f"Agent {agent_path} is {type(agent).__name__}, not a pure ADK type"
            )
            for sa in getattr(agent, "sub_agents", []):
                check(sa, agent_path)

        check(self.root)

    def test_total_agent_count(self):
        count = 0
        def walk(agent):
            nonlocal count
            count += 1
            for sa in getattr(agent, "sub_agents", []):
                walk(sa)
        walk(self.root)
        assert count == 68

    def test_persona_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        expected = {
            "field_cto", "ae", "account_sa", "ai_specialist_sa",
            "ai_specialist_sales", "content", "program_knowledge",
        }
        assert expected.issubset(names)

    def test_customer_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        expected = {
            "customer_data_scientist", "customer_ml_platform_lead",
            "customer_model_risk_manager", "customer_executive_sponsor",
        }
        assert expected.issubset(names)

    def test_workflow_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        expected = {
            "readiness_assessment", "content_pipeline", "program_planner",
            "architecture_designer", "use_case_qualifier",
        }
        assert expected.issubset(names)

    def test_deliverable_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        expected = {
            "deliverable_assessment_report", "deliverable_program_charter",
            "deliverable_architecture_doc",
        }
        assert expected.issubset(names)

    def test_feedback_and_governance_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        assert "feedback_loop" in names
        assert "governance_gate_checker" in names

    def test_strategic_agents_present(self):
        names = {sa.name for sa in self.root.sub_agents}
        expected = {
            "multi_customer_orchestrator", "competitive_battlecard",
            "training_advisor",
        }
        assert expected.issubset(names)

    def test_readiness_assessment_is_sequential(self):
        from google.adk.agents import SequentialAgent
        ra = next(sa for sa in self.root.sub_agents if sa.name == "readiness_assessment")
        assert isinstance(ra, SequentialAgent)
        assert len(ra.sub_agents) == 6

    def test_feedback_loop_structure(self):
        from google.adk.agents import SequentialAgent
        fl = next(sa for sa in self.root.sub_agents if sa.name == "feedback_loop")
        assert isinstance(fl, SequentialAgent)
        assert len(fl.sub_agents) == 3

    def test_governance_gate_structure(self):
        from google.adk.agents import SequentialAgent
        gg = next(sa for sa in self.root.sub_agents if sa.name == "governance_gate_checker")
        assert isinstance(gg, SequentialAgent)
        assert len(gg.sub_agents) == 4


class TestToolRegistry:
    """Verify tool registry builds correctly."""

    def test_tool_count(self):
        from ai_factory_agent.tool_registry import TOOL_IMPLEMENTATIONS
        assert len(TOOL_IMPLEMENTATIONS) == 53

    def test_account_tools_registered(self):
        from ai_factory_agent.tool_registry import TOOL_IMPLEMENTATIONS
        account_tools = [
            "list_customers", "load_customer_context", "create_customer_account",
            "update_customer_phase", "update_customer_use_case",
            "update_customer_model", "save_assessment_results",
        ]
        for tool in account_tools:
            assert tool in TOOL_IMPLEMENTATIONS, f"Missing tool: {tool}"

    def test_model_lifecycle_tools_registered(self):
        from ai_factory_agent.tool_registry import TOOL_IMPLEMENTATIONS
        model_tools = [
            "register_model", "transition_model", "update_model_governance",
            "update_model_metrics", "get_model_status", "list_models",
        ]
        for tool in model_tools:
            assert tool in TOOL_IMPLEMENTATIONS, f"Missing tool: {tool}"

    def test_infra_tools_registered(self):
        from ai_factory_agent.tool_registry import TOOL_IMPLEMENTATIONS
        infra_tools = [
            "get_cluster_status", "get_gpu_status", "get_model_registry_status",
            "get_inference_endpoints", "get_pipeline_status", "get_infrastructure_summary",
        ]
        for tool in infra_tools:
            assert tool in TOOL_IMPLEMENTATIONS, f"Missing tool: {tool}"

    def test_all_tools_are_callable(self):
        from ai_factory_agent.tool_registry import TOOL_IMPLEMENTATIONS
        for tool_id, impl in TOOL_IMPLEMENTATIONS.items():
            assert callable(impl), f"Tool {tool_id} is not callable"
