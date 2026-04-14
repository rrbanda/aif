from __future__ import annotations

import logging
from typing import Callable

from .config_loader import load_tools_config, ToolsFileConfig
from .tools import (
    content_tools,
    config_tools,
    git_tools,
    generation_tools,
    account_tools,
    deliverable_tools,
    state_tools,
    model_lifecycle_tools,
    infra_tools,
    metrics_tools,
    portfolio_tools,
    multi_customer_tools,
    battlecard_tools,
    training_tools,
)

logger = logging.getLogger(__name__)

TOOL_IMPLEMENTATIONS: dict[str, Callable] = {
    "read_config": config_tools.read_config,
    "read_content": content_tools.read_content,
    "write_content": content_tools.write_content,
    "search_content": content_tools.search_content,
    "list_content_tree": content_tools.list_content_tree,
    "git_commit": git_tools.git_commit,
    "generate_executive_summary": generation_tools.generate_executive_summary,
    "calculate_roi_estimate": generation_tools.calculate_roi_estimate,
    "generate_architecture_diagram_description": generation_tools.generate_architecture_diagram_description,
    "generate_pipeline_description": generation_tools.generate_pipeline_description,
    "generate_use_case_qualification": generation_tools.generate_use_case_qualification,
    "list_customers": account_tools.list_customers,
    "load_customer_context": account_tools.load_customer_context,
    "update_customer_phase": account_tools.update_customer_phase,
    "update_customer_use_case": account_tools.update_customer_use_case,
    "update_customer_model": account_tools.update_customer_model,
    "save_assessment_results": account_tools.save_assessment_results,
    "create_customer_account": account_tools.create_customer_account,
    "save_deliverable": deliverable_tools.save_deliverable,
    "list_deliverables": deliverable_tools.list_deliverables,
    "save_workflow_state": state_tools.save_workflow_state,
    "load_workflow_state": state_tools.load_workflow_state,
    "list_workflow_states": state_tools.list_workflow_states,
    "register_model": model_lifecycle_tools.register_model,
    "transition_model": model_lifecycle_tools.transition_model,
    "update_model_governance": model_lifecycle_tools.update_model_governance,
    "update_model_metrics": model_lifecycle_tools.update_model_metrics,
    "get_model_status": model_lifecycle_tools.get_model_status,
    "list_models": model_lifecycle_tools.list_models,
    "get_cluster_status": infra_tools.get_cluster_status,
    "get_gpu_status": infra_tools.get_gpu_status,
    "get_model_registry_status": infra_tools.get_model_registry_status,
    "get_inference_endpoints": infra_tools.get_inference_endpoints,
    "get_pipeline_status": infra_tools.get_pipeline_status,
    "get_infrastructure_summary": infra_tools.get_infrastructure_summary,
    "ingest_model_metrics": metrics_tools.ingest_model_metrics,
    "get_metrics_history": metrics_tools.get_metrics_history,
    "detect_anomalies": metrics_tools.detect_anomalies,
    "generate_feedback_report": metrics_tools.generate_feedback_report,
    "create_use_case": portfolio_tools.create_use_case,
    "transition_use_case": portfolio_tools.transition_use_case,
    "get_portfolio_summary": portfolio_tools.get_portfolio_summary,
    "update_use_case_kpis": portfolio_tools.update_use_case_kpis,
    "get_use_case_detail": portfolio_tools.get_use_case_detail,
    "get_customer_portfolio_view": multi_customer_tools.get_customer_portfolio_view,
    "get_cross_customer_patterns": multi_customer_tools.get_cross_customer_patterns,
    "get_resource_allocation_view": multi_customer_tools.get_resource_allocation_view,
    "generate_battlecard": battlecard_tools.generate_battlecard,
    "list_competitors": battlecard_tools.list_competitors,
    "get_learning_paths": training_tools.get_learning_paths,
    "recommend_learning_path": training_tools.recommend_learning_path,
    "track_training_progress": training_tools.track_training_progress,
    "get_team_training_summary": training_tools.get_team_training_summary,
}


def build_tool_registry(
    tools_config: ToolsFileConfig | None = None,
) -> dict[str, Callable]:
    if tools_config is None:
        tools_config = load_tools_config()

    registry: dict[str, Callable] = {}
    for tool_def in tools_config.tools:
        impl = TOOL_IMPLEMENTATIONS.get(tool_def.id)
        if impl is None:
            raise ValueError(
                f"Tool '{tool_def.id}' defined in agent-tools.yaml "
                f"but has no Python implementation in TOOL_IMPLEMENTATIONS"
            )
        registry[tool_def.id] = impl
        logger.debug("Registered tool: %s", tool_def.id)

    logger.info("Built tool registry with %d tools", len(registry))
    return registry
